import { yupResolver } from "@hookform/resolvers/yup";
import { Button, DatePicker, Input, InputNumber, Modal, Select, message } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { FaPlus } from "react-icons/fa";
import DataTable from "../Components/DataTable";

const reservationSchema = yup.object({
  nbr: yup.number().required("Le numéro est requis"),
  dateRéservation: yup.string().required("La date de réservation est requise"),
  immeuble: yup.number().required("L'immeuble est requis"),
  type: yup.string().required("Le type est requis"),
  codeManfiaa: yup.string().required("Le code Manfiaa est requis"),
  codeCadastre: yup.string().required("Le code Cadastre est requis"),
  numParking: yup.number().required("Le numéro de parking est requis"),
  numéroDeLaTaxeThTsc: yup.string().required("La taxe est requise"),
  nFraction: yup.number().required("Le numéro de fraction est requis"),
  résérvOui1Non0: yup.boolean().required("Le statut de réservation est requis"),
  superf: yup.number().required("La superficie est requise"),
  mezanine: yup.number().required("La mezzanine est requise"),
  nom: yup.string().required("Le nom est requis"),
  téléphone: yup.string().required("Le téléphone est requis"),
  prixDeVente: yup.number().required("Le prix de vente est requis"),
  prixContrat: yup.number().required("Le prix du contrat est requis"),
  avanceContrat: yup.number().required("L'avance du contrat est requise"),
  autofinancement: yup.number().required("L'autofinancement est requis"),
  reliquatRèglementClt: yup.number().required("Le reliquat est requis"),
  contratRéservation: yup.string().required("Le contrat de réservation est requis"),
  commercial: yup.string().required("Le commercial est requis"),
  remarque: yup.string().required("La remarque est requise"),
  notaire: yup.string().required("Le notaire est requis"),
  signatureCvVi: yup.string().required("La signature est requise"),
  regCyndic: yup.string().required("Le règlement syndic est requis"),
  nFraction2: yup.string().required("Le numéro de fraction 2 est requis"),
  nDuTitre13: yup.string().required("Le titre est requis"),
  superficieCadastraleMag: yup.number().required("La superficie cadastrale est requise"),
  superficiePlancherCad: yup.number().required("La superficie plancher est requise"),
  consistance: yup.string().required("La consistance est requise"),
  niveau: yup.string().required("Le niveau est requis"),
  ptéDite: yup.string().required("La propriété dite est requise"),
  superficieCadastraleMezCad: yup.number().required("La superficie cadastrale mezzanine est requise"),
  numéroDUnité: yup.string().required("Le numéro d'unité est requis"),
});

type ReservationBase = {
  nbr: number;
  dateRéservation: string;
  immeuble: number;
  type: string;
  codeManfiaa: string;
  codeCadastre: string;
  numParking: number;
  numéroDeLaTaxeThTsc: string;
  nFraction: number;
  résérvOui1Non0: boolean;
  superf: number;
  mezanine: number;
  nom: string;
  téléphone: string;
  prixDeVente: number;
  prixContrat: number;
  avanceContrat: number;
  autofinancement: number;
  reliquatRèglementClt: number;
  contratRéservation: string;
  commercial: string;
  remarque: string;
  notaire: string;
  signatureCvVi: string;
  regCyndic: string;
  nFraction2: string;
  nDuTitre13: string;
  superficieCadastraleMag: number;
  superficiePlancherCad: number;
  consistance: string;
  niveau: string;
  ptéDite: string;
  superficieCadastraleMezCad: number;
  numéroDUnité: string;
};

type Reservation = ReservationBase & {
  reservationID: string;
};

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationBase>({
    resolver: yupResolver(reservationSchema),
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

  const onSubmit: SubmitHandler<ReservationBase> = async (data) => {
    try {
      await axios.post("https://localhost:7230/api/Reservation", data);
      message.success("Réservation ajoutée avec succès");
      fetchReservations();
      setIsModalOpen(false);
      reset();
    } catch (error) {
      message.error("Erreur lors de l'ajout de la réservation");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);
 
interface TableCellProps {
  getValue: () => any;
    record: any;
}
  const columns = [
    {
      accessorKey: "nbr",
      header: "Numéro",
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
  <DataTable data={reservations } isLoading={loading} columns={columns}  />
</div>
     <Modal
  title="Ajouter une réservation"
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  footer={null}
>
  <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <label className="block text-sm font-medium text-gray-700">Date de Réservation</label>
        <Controller
          name="dateRéservation"
          control={control}
          render={({ field }) => (
            <DatePicker {...field} format="YYYY-MM-DD" className="w-full" />
          )}
        />
        {errors.dateRéservation && <p className="text-red-500 text-xs mt-1">{errors.dateRéservation.message}</p>}
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

      {[
        { name: 'type', label: 'Type' },
        { name: 'codeManfiaa', label: 'Code Manfiaa' },
        { name: 'codeCadastre', label: 'Code Cadastre' },
        { name: 'numParking', label: 'Numéro de Parking', type: 'number' },
        { name: 'numéroDeLaTaxeThTsc', label: 'Numéro de la Taxe' },
        { name: 'nFraction', label: 'N° Fraction', type: 'number' },
        { name: 'résérvOui1Non0', label: 'Réservé (Oui/Non)', type: 'select' },
        { name: 'superf', label: 'Superficie', type: 'number' },
        { name: 'mezanine', label: 'Mezzanine', type: 'number' },
        { name: 'nom', label: 'Nom' },
        { name: 'téléphone', label: 'Téléphone' },
        { name: 'prixDeVente', label: 'Prix de Vente', type: 'number' },
        { name: 'prixContrat', label: 'Prix Contrat', type: 'number' },
        { name: 'avanceContrat', label: 'Avance Contrat', type: 'number' },
        { name: 'autofinancement', label: 'Autofinancement', type: 'number' },
        { name: 'reliquatRèglementClt', label: 'Reliquat Client', type: 'number' },
        { name: 'contratRéservation', label: 'Contrat Réservation' },
        { name: 'commercial', label: 'Commercial' },
        { name: 'remarque', label: 'Remarque' },
        { name: 'notaire', label: 'Notaire' },
        { name: 'signatureCvVi', label: 'Signature CV/VI' },
        { name: 'regCyndic', label: 'Règlement Syndic' },
        { name: 'nFraction2', label: 'N° Fraction 2' },
        { name: 'nDuTitre13', label: 'N° Titre 13' },
        { name: 'superficieCadastraleMag', label: 'Superficie Cadastrale Mag', type: 'number' },
        { name: 'superficiePlancherCad', label: 'Superficie Plancher Cad', type: 'number' },
        { name: 'consistance', label: 'Consistance' },
        { name: 'niveau', label: 'Niveau' },
        { name: 'ptéDite', label: 'Pté dite' },
        { name: 'superficieCadastraleMezCad', label: 'Superficie Cadastrale Mez Cad', type: 'number' },
        { name: 'numéroDUnité', label: 'Numéro d’Unité' }
      ].map((fieldItem) => (
        <div key={fieldItem.name}>
          <label className="block text-sm font-medium text-gray-700">{fieldItem.label}</label>
          <Controller
            name={fieldItem.name as any}
            control={control}
            render={({ field }) => {
              if (fieldItem.type === 'number') {
                return <InputNumber {...field} className="w-full" />;
              } else if (fieldItem.type === 'select') {
                return (
                  <Select
                    {...field}
                    className="w-full"
                    options={[
                      { value: true, label: 'Oui' }, 
                      { value: false, label: 'Non' }
                    ]}
                  />
                );
              } else {
                return <Input {...field} className="w-full" />;
              }
            }}
          />
          {errors[fieldItem.name] && (
            <p className="text-red-500 text-xs mt-1">{errors[fieldItem.name]?.message}</p>
          )}
        </div>
      ))}
    </div>

    <div className="flex justify-end">
      <Button type="primary" htmlType="submit">
        Enregistrer
      </Button>
    </div>
  </form>
</Modal>

    </div>
  );
};

export default Reservations;
