import axios from "axios";

const API_BASE_URL = "https://localhost:7230/api/Reservation";

export interface ReservationDTO {
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
}

export const createReservation = async (data: ReservationDTO) => {
  try {
    const response = await axios.post<ReservationDTO>(API_BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

export const updateReservation = async (id: number, data: ReservationDTO) => {
  try {
    const response = await axios.put<ReservationDTO>(
      `${API_BASE_URL}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
};

export const deleteReservation = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.status === 204; // Returns true if deletion was successful
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw error;
  }
};

// Additional utility functions that might be useful
export const getAllReservations = async () => {
  try {
    const response = await axios.get<ReservationDTO[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};

export const getReservationById = async (id: number) => {
  try {
    const response = await axios.get<ReservationDTO>(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservation:", error);
    throw error;
  }
};