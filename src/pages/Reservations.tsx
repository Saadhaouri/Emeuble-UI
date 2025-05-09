import { yupResolver } from "@hookform/resolvers/yup";
import { Button, DatePicker, Input, InputNumber, Modal, Select, message } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { FaPlus } from "react-icons/fa";
import DataTable from "../Components/DataTable";
import dayjs from "dayjs";


const reservationSchema = yup.object({
  nbr: yup.number().required("Le numéro est requis"),
  dateRéservation: yup.date().nullable(),
  immeuble: yup.number().nullable(),
  type: yup.string().nullable(),
  codeManfiaa: yup.string().nullable(),
  codeCadastre: yup.string().nullable(),
  numParking: yup.number().nullable(), // decimal
  numéroDeLaTaxeThTsc: yup.string().nullable(), // string en C#
  nFraction: yup.number().nullable(),
  résérvOui1Non0: yup.boolean().nullable(),
  superf: yup.number().nullable(),
  mezanine: yup.number().nullable(),
  nom: yup.string().nullable(),
  téléphone: yup.string().nullable(),
  prixDeVente: yup.number().nullable(), // double
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
  nDuTitre13: yup.string().nullable(), // string en C#
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
  dateRéservation: string | null; // ISO format si envoyé au backend
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


const baseURL = "https://localhost:7230/api/Reservation";

export const deleteReservation = async (id: string) => {
  return axios.delete(`${baseURL}/${id}`);
};
const formatDateForInput = (date: string) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};


type Reservation = ReservationBase & {
  reservationID: string;
};

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationBase>({
    defaultValues: {
      nbr: 0,
      dateRéservation: "",
      immeuble: 0,
      type: "",
      codeManfiaa: "",
      codeCadastre: "",
      numParking: 0,
      numéroDeLaTaxeThTsc: "",
      nFraction: 0,
      résérvOui1Non0: false,
      superf: 0,
      mezanine: 0,
      nom: "",
      téléphone: "",
      prixDeVente: 0,
      prixContrat: 0,
      avanceContrat: 0,
      autofinancement: 0,
      reliquatRèglementClt: 0,
      contratRéservation: "",
      commercial: "",
      remarque: "",
      notaire: "",
      signatureCvVi: "",
      regCyndic: "",
      nFraction2: "",
      nDuTitre13: "",
      superficieCadastraleMag: 0,
      superficiePlancherCad: 0,
      consistance: "",
      niveau: "",
      ptéDite: "",
      superficieCadastraleMezCad: 0,
      numéroDUnité: "",
    },
    resolver: yupResolver(reservationSchema) as any,
  });

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://localhost:7230/api/Reservation");
      setReservations(response.data);
    } catch (error) {
      message.error("Erreur lors du chargement des réservations");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsEdit(false);
    reset({
      nbr: 0,
      dateRéservation: new Date().toISOString().split("T")[0],
      immeuble: 0,
      type: "",
      codeManfiaa: "",
      codeCadastre: "",
      numParking: 0,
      numéroDeLaTaxeThTsc: "",
      nFraction: 0,
      résérvOui1Non0: false,
      superf: 0,
      mezanine: 0,
      nom: "",
      téléphone: "",
      prixDeVente: 0,
      prixContrat: 0,
      avanceContrat: 0,
      autofinancement: 0,
      reliquatRèglementClt: 0,
      contratRéservation: "",
      commercial: "",
      remarque: "",
      notaire: "",
      signatureCvVi: "",
      regCyndic: "",
      nFraction2: "",
      nDuTitre13: "",
      superficieCadastraleMag: 0,
      superficiePlancherCad: 0,
      consistance: "",
      niveau: "",
      ptéDite: "",
      superficieCadastraleMezCad: 0,
      numéroDUnité: "",
    });
    setIsModalOpen(true);
  };
  const showEditModal = (reservation: Reservation) => {

    setIsEdit(true);
    reset({
      ...reservation,
      dateRéservation: reservation.dateRéservation ? new Date(reservation.dateRéservation).toISOString() : null,
    });

    setIsModalOpen(true);
  };


  const handleCreateReservation: SubmitHandler<ReservationBase> = async (data) => {
    try {
      await axios.post(baseURL, data);
      setIsModalOpen(false);
      message.success("Réservation ajoutée avec succès");
      reset();
      // Refresh the reservation list after adding a reservation
      fetchReservations();
    } catch (error) {
      message.error("Erreur lors de l'ajout de la réservation");
      console.error("Failed to create reservation:", error);
    }
  };

  const handleUpdateReservation: SubmitHandler<Reservation> = async (data) => {
    try {
      await axios.put(`${baseURL}/${data.nbr}`, data);
      setIsModalOpen(false);
      message.success("Réservation mise à jour avec succès");
      // Refresh the reservation list after updating a reservation
      fetchReservations();
    } catch (error) {
      message.error("Erreur lors de la mise à jour de la réservation");
      console.error("Failed to update reservation:", error);
    }
  };

  // const onSubmit: SubmitHandler<ReservationBase | Reservation> = async (data) => {
  //   try {
  //     if (isEdit && (data as Reservation).nbr) {
  //       await axios.put(`${baseURL}/${(data as Reservation).nbr}`, data);
  //       message.success("Réservation mise à jour avec succès");
  //     } else {
  //       await axios.post(baseURL, data);
  //       message.success("Réservation ajoutée avec succès");
  //     }
  //     fetchReservations();
  //     setIsModalOpen(false);
  //     reset();
  //     setIsEdit(false);
  //   } catch (error) {
  //     message.error("Erreur lors de l'enregistrement de la réservation");
  //   }
  // };

  useEffect(() => {
    fetchReservations();
  }, []);

interface TableCellProps {
  getValue: () => any;
    record: any;
}

const handleOk = () => {
  if (formRef.current) {
    formRef.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  }
};
const handleCancel = () => {
  setIsModalOpen(false);
  // reset();
};
const confirmDelete = (nbr: string) => {
  Modal.confirm({
    title: "Êtes-vous sûr de vouloir supprimer cet Reservation ?",
    content: "Cette action ne peut pas être annulée.",
    okText: "Oui",
    okType: "danger",
    cancelText: "Non",
    onOk: () => handleDeleteReservation(nbr),
  });
};


const handleDeleteReservation = async (reservationId: string) => {
  try {
    await deleteReservation(reservationId);
    message.success("Réservation supprimée avec succès");

    // Refresh list after deletion
    const response = await axios.get("https://localhost:7230/api/Reservation");
    setReservations(response.data);
  } catch (error) {
    message.error("Erreur lors de la suppression de la réservation");
    console.error("Failed to delete reservation:", error);
  }
};




  const columns = [
    {
      accessorKey: "nbr",
      header: "Numéro",
      cell: ({ cell }: { cell: TableCellProps }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "codeManfiaa",
      header: "Code Manfiaa",
      cell: ({ cell }: { cell: TableCellProps }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "codeCadastre",
      header: "Code Cadastre",
      cell: ({ cell }: { cell: TableCellProps }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "dateRéservation",
      header: "Date de Réservation",
      cell: ({ cell }: { cell: TableCellProps }) => (
        <span>{new Date(cell.getValue()).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "immeuble",
      header: "Immeuble",
      cell: ({ cell }: { cell: TableCellProps }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ cell }: { cell: TableCellProps }) => <span>{cell.getValue()}</span>,
    },

    {
      accessorKey: "nom",
      header: "Nom",
      cell: ({ cell }: { cell: TableCellProps }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "téléphone",
      header: "Téléphone",
      cell: ({ cell }: { cell: TableCellProps }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "prixDeVente",
      header: "Prix de Vente",
      cell: ({ cell }: { cell: TableCellProps }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "prixContrat",
      header: "Prix du Contrat",
      cell: ({ cell }: { cell: TableCellProps }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "avanceContrat",
      header: "Avance du Contrat",
      cell: ({ cell }: { cell: TableCellProps }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "reliquatRèglementClt",
      header: "Reliquat Règlement",
      cell: ({ cell }: { cell: TableCellProps }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "commercial",
      header: "Commercial",
      cell: ({ cell }: { cell: TableCellProps }) => <span>{cell.getValue()}</span>,
    },
    {
      accessorKey: "remarque",
      header: "Remarque",
      cell: ({ cell }: { cell: TableCellProps }) => <span>{cell.getValue()}</span>,
    },
  ];
  return (
    <div>
      <div className="header flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-blue-600">Réservations</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
        >
          <FaPlus /> Ajouter une réservation
        </button>
      </div>
<div className="table-container" style={{ margin: "20px 0" }}>
<DataTable
  data={reservations}
  columns={columns}
  onUpdate={(row) => showEditModal(row.original)}
  onDelete={(row) => confirmDelete(row.original.nbr)}
/>

</div>
<Modal
        title={isEdit ? "Modifier Reservation" : "Ajouter Reservation"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
  <form
    onSubmit={handleSubmit((data, e) =>
      isEdit
      ? handleUpdateReservation(data as Reservation)
      : handleCreateReservation(data, e)
    )}
    ref={formRef}
    className="space-y-6"
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Replace this block for each field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Numéro</label>
        <Controller
          name="nbr"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.nbr && <p className="text-red-500 text-xs mt-1">{errors.nbr.message}</p>}
      </div>



      <div>
        <label className="block text-sm font-medium text-gray-700">Immeuble</label>
        <Controller
          name="immeuble"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.immeuble && <p className="text-red-500 text-xs mt-1">{errors.immeuble.message}</p>}
      </div>

      {/* === CONTINUE ALL OTHER FIELDS BELOW === */}

      <Controller
  name="dateRéservation"
  control={control}
  render={({ field }) => (
    <DatePicker
      {...field}
      format="YYYY-MM-DD"
      value={field.value ? dayjs(field.value) : null}
      onChange={(date) => field.onChange(date ? date.toISOString() : null)}
      style={{ width: "100%" }}
    />
  )}
/>
{errors.dateRéservation && (
  <p className="text-red-500 text-xs">{errors.dateRéservation.message}</p>
)}


      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
    </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Code Manfiaa</label>
        <Controller
          name="codeManfiaa"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.codeManfiaa && <p className="text-red-500 text-xs mt-1">{errors.codeManfiaa.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Code Cadastre</label>
        <Controller
          name="codeCadastre"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.codeCadastre && <p className="text-red-500 text-xs mt-1">{errors.codeCadastre.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Numéro de Parking</label>
        <Controller
          name="numParking"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.numParking && <p className="text-red-500 text-xs mt-1">{errors.numParking.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">N° taxe Th Tsc </label>
        <Controller
          name="numéroDeLaTaxeThTsc"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.numéroDeLaTaxeThTsc && <p className="text-red-500 text-xs mt-1">{errors.numéroDeLaTaxeThTsc.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">N° fraction</label>
        <Controller
          name="nFraction"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.nFraction && <p className="text-red-500 text-xs mt-1">{errors.nFraction.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Réservé (Oui/Non)</label>
        <Controller
          name="résérvOui1Non0"
          control={control}
          render={({ field }) => (
            <Select {...field} className="w-full">
              <Select.Option value={true}>Oui</Select.Option>
              <Select.Option value={false}>Non</Select.Option>
            </Select>
          )}
        />
        {errors.résérvOui1Non0 && <p className="text-red-500 text-xs mt-1">{errors.résérvOui1Non0.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Superficie</label>
        <Controller
          name="superf"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.superf && <p className="text-red-500 text-xs mt-1">{errors.superf.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Mezanine</label>
        <Controller
          name="mezanine"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.mezanine && <p className="text-red-500 text-xs mt-1">{errors.mezanine.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <Controller
          name="nom"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Téléphone</label>
        <Controller
          name="téléphone"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.téléphone && <p className="text-red-500 text-xs mt-1">{errors.téléphone.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Prix de Vente</label>
        <Controller
          name="prixDeVente"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.prixDeVente && <p className="text-red-500 text-xs mt-1">{errors.prixDeVente.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Prix du Contrat</label>
        <Controller
          name="prixContrat"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.prixContrat && <p className="text-red-500 text-xs mt-1">{errors.prixContrat.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Avance du Contrat</label>
          <Controller
          name="avanceContrat"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.avanceContrat && <p className="text-red-500 text-xs mt-1">{errors.avanceContrat.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Autofinancement</label>
        <Controller
          name="autofinancement"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.autofinancement && <p className="text-red-500 text-xs mt-1">{errors.autofinancement.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Reliquat Règlement</label>

        <Controller
          name="reliquatRèglementClt"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.reliquatRèglementClt && <p className="text-red-500 text-xs mt-1">{errors.reliquatRèglementClt.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contrat de Réservation</label>
        <Controller
          name="contratRéservation"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.contratRéservation && <p className="text-red-500 text-xs mt-1">{errors.contratRéservation.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Commercial</label>
        <Controller
          name="commercial"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.commercial && <p className="text-red-500 text-xs mt-1">{errors.commercial.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Remarque</label>
        <Controller
          name="remarque"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.remarque && <p className="text-red-500 text-xs mt-1">{errors.remarque.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Notaire</label>
        <Controller
          name="notaire"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.notaire && <p className="text-red-500 text-xs mt-1">{errors.notaire.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Signature Cv Vi</label>
        <Controller
          name="signatureCvVi"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.signatureCvVi && <p className="text-red-500 text-xs mt-1">{errors.signatureCvVi.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Reg Cyndic</label>
        <Controller
          name="regCyndic"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.regCyndic && <p className="text-red-500 text-xs mt-1">{errors.regCyndic.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">N° fraction 2</label>
        <Controller
          name="nFraction2"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.nFraction2 && <p className="text-red-500 text-xs mt-1">{errors.nFraction2.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">N° du Titre 13</label>
        <Controller
          name="nDuTitre13"
          control={control}
          render={({ field }) => (
            <DatePicker {...field} format="YYYY-MM-DD" className="w-full" />
          )}
        />
        {errors.nDuTitre13 && <p className="text-red-500 text-xs mt-1">{errors.nDuTitre13.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Superficie Cadastrale Mag</label>
        <Controller
          name="superficieCadastraleMag"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.superficieCadastraleMag && <p className="text-red-500 text-xs mt-1">{errors.superficieCadastraleMag.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Superficie Plancher Cad</label>
        <Controller
          name="superficiePlancherCad"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.superficiePlancherCad && <p className="text-red-500 text-xs mt-1">{errors.superficiePlancherCad.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Consistance</label>
          <Controller
          name="consistance"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.consistance && <p className="text-red-500 text-xs mt-1">{errors.consistance.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Niveau</label>
        <Controller
          name="niveau"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.niveau && <p className="text-red-500 text-xs mt-1">{errors.niveau.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Pté Dite</label>
        <Controller
          name="ptéDite"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.ptéDite && <p className="text-red-500 text-xs mt-1">{errors.ptéDite.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Superficie Cadastrale Mez Cad</label>
        <Controller
          name="superficieCadastraleMezCad"
          control={control}
          render={({ field }) => (
            <InputNumber {...field} className="w-full" />
          )}
        />
        {errors.superficieCadastraleMezCad && <p className="text-red-500 text-xs mt-1">{errors.superficieCadastraleMezCad.message}</p>}
        </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Numéro d'Unité</label>
        <Controller
          name="numéroDUnité"
          control={control}
          render={({ field }) => (
            <Input {...field} className="w-full" />
          )}
        />
        {errors.numéroDUnité && <p className="text-red-500 text-xs mt-1">{errors.numéroDUnité.message}</p>}
        </div>
    </div>

  </form>
</Modal>

    </div>
  );
};

export default Reservations;
