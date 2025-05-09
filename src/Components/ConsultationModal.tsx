import { ReservationDTO } from "@/Services/reservationServices";
import { Modal, Descriptions } from "antd";

interface ConsultationModalProps {
  visible: boolean;
  onCancel: () => void;
  reservation: ReservationDTO | null;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({
  visible,
  onCancel,
  reservation,
}) => {
  if (!reservation) return null;

  return (
    <Modal
      title="Consultation de Réservation"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <div className="max-h-[70vh] overflow-y-auto">
        <Descriptions bordered column={1} size="small">
          {/* Basic Information */}
          <Descriptions.Item label="Numéro">{reservation.nbr}</Descriptions.Item>
          <Descriptions.Item label="Date Réservation">
            {reservation.dateRéservation 
              ? new Date(reservation.dateRéservation).toLocaleDateString() 
              : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Nom">{reservation.nom || "-"}</Descriptions.Item>
          <Descriptions.Item label="Téléphone">
            {reservation.téléphone || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Commercial">
            {reservation.commercial || "-"}
          </Descriptions.Item>

          {/* Property Information */}
          <Descriptions.Item label="Immeuble">
            {reservation.immeuble || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Type">{reservation.type || "-"}</Descriptions.Item>
          <Descriptions.Item label="Numéro d'unité">
            {reservation.numéroDUnité || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Niveau">
            {reservation.niveau || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Superficie (m²)">
            {reservation.superf || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Mezzanine (m²)">
            {reservation.mezanine || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Numéro Parking">
            {reservation.numParking || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Consistance">
            {reservation.consistance || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Propriété dite">
            {reservation.ptéDite || "-"}
          </Descriptions.Item>

          {/* Financial Information */}
          <Descriptions.Item label="Prix de vente (DH)">
            {reservation.prixDeVente?.toLocaleString() || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Prix contrat (DH)">
            {reservation.prixContrat?.toLocaleString() || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Avance contrat (DH)">
            {reservation.avanceContrat?.toLocaleString() || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Autofinancement (DH)">
            {reservation.autofinancement?.toLocaleString() || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Reliquat règlement (DH)">
            {reservation.reliquatRèglementClt?.toLocaleString() || "-"}
          </Descriptions.Item>

          {/* Legal Information */}
          <Descriptions.Item label="Code Manfiaa">
            {reservation.codeManfiaa || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Code Cadastre">
            {reservation.codeCadastre || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Numéro Taxe TH/TSC">
            {reservation.numéroDeLaTaxeThTsc || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Contrat Réservation">
            {reservation.contratRéservation || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Notaire">
            {reservation.notaire || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Signature CV/VI">
            {reservation.signatureCvVi || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Règlement Cyndic">
            {reservation.regCyndic || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Numéro Fraction">
            {reservation.nFraction || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Numéro Fraction 2">
            {reservation.nFraction2 || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Numéro Titre 13">
            {reservation.nDuTitre13 || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Superficie Cadastrale Mag (m²)">
            {reservation.superficieCadastraleMag || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Superficie Plancher Cad (m²)">
            {reservation.superficiePlancherCad || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Superficie Cadastrale Mez (m²)">
            {reservation.superficieCadastraleMezCad || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Réservé">
            {reservation.résérvOui1Non0 ? "Oui" : "Non"}
          </Descriptions.Item>
          
          {/* Remarks */}
          <Descriptions.Item label="Remarque" span={2}>
            {reservation.remarque || "-"}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
};

export default ConsultationModal;