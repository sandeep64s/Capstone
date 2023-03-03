import axios from "axios";
import { TrainingType } from "../../types/types";

// const baseUrl = "https://trainingform-ihaej.run-ap-south1.goorm.io/trainings";

const VITE_SERVERURL = import.meta.env.VITE_SERVERURL;
const baseUrl = `${VITE_SERVERURL}/api/v1/trainings`;
// const baseUrl = "https://training-backend-team3.herokuapp.com/trainings"

export function getTrainings() {
  return axios.get(baseUrl);
}

export function getTrainingsPagination(page: number, limit: number) {
  return axios.get(baseUrl + `?page=${page}&limit=${limit}`);
}

export function getTraining(id: string) {
  return axios.get(
    baseUrl + "/" + encodeURIComponent(id) + "?page=1&limit=100"
  );
}
export function deleteTraining(id: string) {
  return axios.delete(baseUrl + "/" + id);
}

export function createTraining(training: TrainingType) {
  return axios.post(baseUrl, training, {
    headers: { "content-type": "application/json" },
  });
}

export function createTrainingWithPagination(
  training: TrainingType,
  page: number,
  limit: number
) {
  return axios.post(baseUrl + `?page=${page}&limit=${limit}`, training, {
    headers: { "content-type": "application/json" },
  });
}

export function editTraining(id: string, training: TrainingType) {
  return axios.patch(baseUrl + "/" + id, training, {
    headers: { "content-type": "application/json" },
  });
}
