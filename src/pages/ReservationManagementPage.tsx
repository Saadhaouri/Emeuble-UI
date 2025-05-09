import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, message } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { createReservation, deleteReservation, updateReservation } from "../Services/reservationServices";

import DataTable from "../Components/DataTable";
import { FaPlus } from "react-icons/fa";
import ConsultationModal from "../Components/ConsultationModal";

const reservationSchema = yup.object({
  nbr: yup.number().required("Le numéro est requis"),
  dateRéservation: yup.string().nullable(),
  immeuble: yup.number().nullable(),
  type: yup.string().nullable(),
  codeManfiaa: yup.string().nullable(),
  codeCadastre: yup.string().nullable(),
  numParking: yup.number().nullable(),
  numéroDeLaTaxeThTsc: yup.string().nullable(),
  nFraction: yup.number().nullable(),
  résérvOui1Non0: yup.boolean().nullable(),
  superf: yup.number().nullable(),
  mezanine: yup.number().nullable(),
  nom: yup.string().nullable(),
  téléphone: yup.string().nullable(),
  prixDeVente: yup.number().nullable(),
  prixContrat: yup.number().nullable(),
  avanceContrat: yup.number().nullable(),
  autofinancement: yup.number().nullable(),
  reliquatRèglementClt: yup.number().nullable(),
  contratRéservation: yup.string().nullable(),
  commercial: yup.string().nullable(),
  remarque: yup.string().nullable(),
  notaire: yup.string().nullable(),
  signatureCvVi: yup.string().nullable(),
  regCyndic: yup.string().nullable(),
  nFraction2: yup.string().nullable(),
  nDuTitre13: yup.string().nullable(),
  superficieCadastraleMag: yup.number().nullable(),
  superficiePlancherCad: yup.number().nullable(),
  consistance: yup.string().nullable(),
  niveau: yup.string().nullable(),
  ptéDite: yup.string().nullable(),
  superficieCadastraleMezCad: yup.number().nullable(),
  numéroDUnité: yup.string().nullable(),
});

type ReservationBase = {
  nbr: number;
  dateRéservation: string | null;
  immeuble: number | null;
  type: string | null;
  codeManfiaa: string | null;
  codeCadastre: string | null;
  numParking: number | null;
  numéroDeLaTaxeThTsc: string | null;
  nFraction: number | null;
  résérvOui1Non0: boolean | null;
  superf: number | null;
  mezanine: number | null;
  nom: string | null;
  téléphone: string | null;
  prixDeVente: number | null;
  prixContrat: number | null;
  avanceContrat: number | null;
  autofinancement: number | null;
  reliquatRèglementClt: number | null;
  contratRéservation: string | null;
  commercial: string | null;
  remarque: string | null;
  notaire: string | null;
  signatureCvVi: string | null;
  regCyndic: string | null;
  nFraction2: string | null;
  nDuTitre13: string | null;
  superficieCadastraleMag: number | null;
  superficiePlancherCad: number | null;
  consistance: string | null;
  niveau: string | null;
  ptéDite: string | null;
  superficieCadastraleMezCad: number | null;
  numéroDUnité: string | null;
};

type Reservation = ReservationBase & {
  id: string;
};

type AddReservation = ReservationBase;

interface TableCellProps {
  getValue: () => any;
  record: any;
}

const formatDateForInput = (date: string | null) => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const ReservationManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [reservationList, setReservationList] = useState<Reservation[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);

  const [consultationModalVisible, setConsultationModalVisible] = useState(false);
const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);


const showConsultationModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setConsultationModalVisible(true);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Reservation>({
    defaultValues: {
      nbr: 0,
      dateRéservation: null,
      immeuble: null,
      type: null,
      codeManfiaa: null,
      codeCadastre: null,
      numParking: null,
      numéroDeLaTaxeThTsc: null,
      nFraction: null,
      résérvOui1Non0: null,
      superf: null,
      mezanine: null,
      nom: null,
      téléphone: null,
      prixDeVente: null,
      prixContrat: null,
      avanceContrat: null,
      autofinancement: null,
      reliquatRèglementClt: null,
      contratRéservation: null,
      commercial: null,
      remarque: null,
      notaire: null,
      signatureCvVi: null,
      regCyndic: null,
      nFraction2: null,
      nDuTitre13: null,
      superficieCadastraleMag: null,
      superficiePlancherCad: null,
      consistance: null,
      niveau: null,
      ptéDite: null,
      superficieCadastraleMezCad: null,
      numéroDUnité: null,
    },
    resolver: yupResolver(reservationSchema) as any,
  });

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const [reservationsResponse ] = await Promise.all([
          axios.get("https://localhost:7230/api/Reservation"),
        ]);
        setReservationList(reservationsResponse.data);
      } catch (error) {
        console.error("There was an error fetching the reservations!", error);
      }
    };

    fetchReservations();
  }, []);

  const handleCreateReservation: SubmitHandler<AddReservation> = async (data) => {
    try {
      await createReservation(data);
      setIsModalVisible(false);
      message.success("Réservation ajoutée avec succès");
      reset();
      const reservationsResponse = await axios.get("https://localhost:7230/api/Reservation");
      setReservationList(reservationsResponse.data);
    } catch (error) {
      message.error("Erreur lors de l'ajout de la réservation");
      console.error("Failed to create reservation:", error);
    }
  };

  const handleUpdateReservation: SubmitHandler<Reservation> = async (data) => {
    try {
      await updateReservation(data.nbr, data);
      setIsModalVisible(false);
      message.success("Réservation mise à jour avec succès");
      const reservationsResponse = await axios.get("https://localhost:7230/api/Reservation");
      setReservationList(reservationsResponse.data);
    } catch (error) {
      message.error("Erreur lors de la mise à jour de la réservation");
      console.error("Failed to update reservation:", error);
    }
  };

  const handleDeleteReservation = async (nbr: number) => {
    try {
      await deleteReservation(nbr);
      message.success("Réservation supprimée avec succès");
      const reservationsResponse = await axios.get("https://localhost:7230/api/Reservation");
      setReservationList(reservationsResponse.data);
    } catch (error) {
      message.error("Erreur lors de la suppression de la réservation");
      console.error("Failed to delete reservation:", error);
    }
  };

  const confirmDelete = (nbr: number) => {
    Modal.confirm({
      title: "Êtes-vous sûr de vouloir supprimer cette réservation?",
      content: "Cette action ne peut pas être annulée.",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk: () => handleDeleteReservation(nbr),
    });
  };

  const showModal = () => {
    setIsEdit(false);
    reset({
      nbr: 0,
      dateRéservation: new Date().toISOString().split("T")[0],
      immeuble: null,
      type: null,
      codeManfiaa: null,
      codeCadastre: null,
      numParking: null,
      numéroDeLaTaxeThTsc: null,
      nFraction: null,
      résérvOui1Non0: null,
      superf: null,
      mezanine: null,
      nom: null,
      téléphone: null,
      prixDeVente: null,
      prixContrat: null,
      avanceContrat: null,
      autofinancement: null,
      reliquatRèglementClt: null,
      contratRéservation: null,
      commercial: null,
      remarque: null,
      notaire: null,
      signatureCvVi: null,
      regCyndic: null,
      nFraction2: null,
      nDuTitre13: null,
      superficieCadastraleMag: null,
      superficiePlancherCad: null,
      consistance: null,
      niveau: null,
      ptéDite: null,
      superficieCadastraleMezCad: null,
      numéroDUnité: null,
    });
    setIsModalVisible(true);
  };

  const showEditModal = (reservation: Reservation) => {
    setIsEdit(true);
    reset({
      ...reservation,
      dateRéservation: formatDateForInput(reservation.dateRéservation),
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      accessorKey: "nbr",
      header: "Numéro",
      cell: ({ cell }: { cell: TableCellProps }) => (
        <span>{cell.getValue()}</span>
      ),
    },
    {
      accessorKey: "nom",
      header: "Nom",
      cell: ({ cell }: { cell: TableCellProps }) => (
        <span>{cell.getValue() || "-"}</span>
      ),
    },
    {
      accessorKey: "téléphone",
      header: "Téléphone",
      cell: ({ cell }: { cell: TableCellProps }) => (
        <span>{cell.getValue() || "-"}</span>
      ),
    },
    {
      accessorKey: "dateRéservation",
      header: "Date Réservation",
      cell: ({ cell }: { cell: TableCellProps }) => (
        <span>
          {cell.getValue()
            ? new Date(cell.getValue()).toLocaleDateString()
            : "-"}
        </span>
      ),
    },
    {
      accessorKey: "prixDeVente",
      header: "Prix de Vente",
      cell: ({ cell }: { cell: TableCellProps }) => (
        <span>{cell.getValue() ? `${cell.getValue()} DH` : "-"}</span>
      ),
    },
    {
      accessorKey: "avanceContrat",
      header: "Avance",
      cell: ({ cell }: { cell: TableCellProps }) => (
        <span>{cell.getValue() ? `${cell.getValue()} DH` : "-"}</span>
      ),
    },
    {
      accessorKey: "reliquatRèglementClt",
      header: "Reliquat",
      cell: ({ cell }: { cell: TableCellProps }) => (
        <span>{cell.getValue() ? `${cell.getValue()} DH` : "-"}</span>
      ),
    },
  ];

  // Calculate statistics
  const reservationCount = reservationList.length;
  const totalAvance = reservationList.reduce(
    (sum, reservation) => sum + (reservation.avanceContrat || 0),
    0
  );
  const totalReliquat = reservationList.reduce(
    (sum, reservation) => sum + (reservation.reliquatRèglementClt || 0),
    0
  );

  return (
    <div className="h-screen overflow-y-auto bg-gray-200">
      <div className="flex items-center justify-between p-2">
        <div className="pl-4 text-left">
          <h1 className="text-1xl font-bold bg-white p-2 rounded shadow-md">
            Gestion des Réservations
          </h1>
        </div>
        <div className="flex items-center justify-end p-4 mx-3">
          <button
            onClick={showModal}
            className="px-4 py-2 flex items-center min-w-[120px] text-center text-white bg-emerald-400 border-emerald-600 shadow-xl hover:shadow rounded active:text-white-500 focus:ring"
          >
            <FaPlus className="mr-2" />
            Ajouter une réservation
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mr-4 ml-4 mb-3">
        <div className="p-4 bg-gradient-to-r from-green-500 to-green-300 rounded shadow-md">
          <h2 className="text-lg font-semibold text-white">
            Nombre de réservations
          </h2>
          <p className="text-2xl text-white font-bold flex justify-center">
            {reservationCount}
          </p>
        </div>
        <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-300 rounded shadow-md">
          <h2 className="text-lg font-semibold text-white">Total avances</h2>
          <p className="text-2xl text-white font-bold flex justify-center">
            {totalAvance} DH
          </p>
        </div>
        <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-white">
            Total reliquats
          </h2>
          <p className="text-2xl text-white font-bold flex justify-center">
            {totalReliquat} DH
          </p>
        </div>
   
      </div>
      <div className="mt-2 p-2 mx-4">
        <DataTable
          columns={columns}
          data={reservationList}
          onUpdate={(row) => showEditModal(row.original)}
          onDelete={(row) => confirmDelete(row.original.nbr)}
          onView={(row) => showConsultationModal(row.original)} 
            />

      </div>
    <Modal
      title={isEdit ? "Modifier Réservation" : "Ajouter Réservation"}
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
    >
      <form
        onSubmit={handleSubmit((data, e) =>
        isEdit
          ? handleUpdateReservation(data as Reservation)
          : handleCreateReservation(data, e)
        )}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 max-h-[70vh] overflow-y-auto p-2"
        ref={formRef}
      >
        {/* Section 1: Basic Information */}
        <div className="space-y-3">
        <h3 className="font-semibold text-lg border-b pb-2">Informations de base</h3>

        <Controller
          name="nbr"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro*</label>
            <input
              {...field}
              type="number"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.nbr && <p className="text-red-500 text-xs mt-1">{errors.nbr.message}</p>}
            </div>
          )}
        />

        <Controller
          name="dateRéservation"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Réservation</label>
            <input
              {...field}
              type="date"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="nom"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="téléphone"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              {...field}
              type="tel"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="commercial"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Commercial</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="remarque"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Remarque</label>
            <textarea
              {...field}
              rows={3}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />
        </div>

        {/* Section 2: Property Information */}
        <div className="space-y-3">
        <h3 className="font-semibold text-lg border-b pb-2">Informations sur le bien</h3>

        <Controller
          name="immeuble"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Immeuble</label>
            <input
              {...field}
              type="number"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sélectionner un type</option>
              <option value="Appartement">Appartement</option>
              <option value="Villa">Villa</option>
              <option value="Local Commercial">Local Commercial</option>
              <option value="Bureau">Bureau</option>
            </select>
            </div>
          )}
        />

        <Controller
          name="numéroDUnité"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro d'unité</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="niveau"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="superf"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Superficie (m²)</label>
            <input
              {...field}
              type="number"
              step="0.01"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="mezanine"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mezzanine (m²)</label>
            <input
              {...field}
              type="number"
              step="0.01"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="numParking"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro Parking</label>
            <input
              {...field}
              type="number"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="consistance"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Consistance</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="ptéDite"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Propriété dite</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />
        </div>

        {/* Section 3: Financial & Legal Information */}
        <div className="space-y-3">
        <h3 className="font-semibold text-lg border-b pb-2">Informations financières</h3>

        <Controller
          name="prixDeVente"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix de vente (DH)</label>
            <input
              {...field}
              type="number"
              step="0.01"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="prixContrat"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix contrat (DH)</label>
            <input
              {...field}
              type="number"
              step="0.01"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="avanceContrat"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Avance contrat (DH)</label>
            <input
              {...field}
              type="number"
              step="0.01"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="autofinancement"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Autofinancement (DH)</label>
            <input
              {...field}
              type="number"
              step="0.01"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="reliquatRèglementClt"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Reliquat règlement (DH)</label>
            <input
              {...field}
              type="number"
              step="0.01"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />
        </div>
<div>


        <h3 className="font-semibold text-lg border-b pb-2 mb-3">Informations légales</h3>

        <Controller
          name="codeManfiaa"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1 ">Code Manfiaa</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="codeCadastre"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Code Cadastre</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="numéroDeLaTaxeThTsc"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro Taxe TH/TSC</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="contratRéservation"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contrat Réservation</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="notaire"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notaire</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="signatureCvVi"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Signature CV/VI</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="regCyndic"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Règlement Cyndic</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="nFraction"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro Fraction</label>
            <input
              {...field}
              type="number"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="nFraction2"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro Fraction 2</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="nDuTitre13"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro Titre 13</label>
            <input
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="superficieCadastraleMag"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Superficie Cadastrale Mag (m²)</label>
            <input
              {...field}
              type="number"
              step="0.01"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="superficiePlancherCad"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Superficie Plancher Cad (m²)</label>
            <input
              {...field}
              type="number"
              step="0.01"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="superficieCadastraleMezCad"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Superficie Cadastrale Mez (m²)</label>
            <input
              {...field}
              type="number"
              step="0.01"
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          )}
        />

        <Controller
          name="résérvOui1Non0"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Réservé</label>
            <select
              {...field}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Sélectionner</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
            </div>
          )}
        />
        </div>
      </form>
    </Modal>
    <ConsultationModal
  visible={consultationModalVisible}
  onCancel={() => setConsultationModalVisible(false)}
  reservation={selectedReservation}
/>
    </div>
  );
};

export default ReservationManagementPage;