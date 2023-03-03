import axios from "axios";
import { TrainingType } from "../../../types/types";

// const baseUrl = "https://trainingform-ihaej.run-ap-south1.goorm.io/trainings";

const VITE_SERVERURL = import.meta.env.VITE_SERVERURL;
const baseUrl = `${VITE_SERVERURL}/api/v1/attendance`;

// const baseUrl = "https://training-backend-team3.herokuapp.com/trainings"

export function getAttendanceWithSession(trainingId: string, date: string, session: string) {
  axios.get(baseUrl + `?trainingId=${trainingId}&date=${date}&session=${session}`).then(res => {
    console.log("RESPONSE")
    console.log(res)
  });
  return axios.get(baseUrl + `?trainingId=${trainingId}&date=${date}&session=${session}`);
}

export function getAttendance(trainingId: string, date: string) {
  return axios.get(baseUrl + `?trainingId=${trainingId}&date=${date}`);
}

export function submitAttendance(traineesPresentM: number[], traineesPresentE: number[], trainingId: string, date: string, checkMSessionChanges: boolean, checkESessionChanges: boolean
) {
  if (checkMSessionChanges) axios.post(baseUrl, { traineesPresent: traineesPresentM, trainingId, date, session: 'M' }, {
    headers: { "content-type": "application/json" },
  });
  if (checkESessionChanges) axios.post(baseUrl, { traineesPresent: traineesPresentE, trainingId, date, session: 'E' }, {
    headers: { "content-type": "application/json" },
  });
  return axios.get(baseUrl + `?trainingId=${trainingId}&date=${date}`);
}

export function submitAttendanceWithSession(traineesPresent: number[], trainingId: string, date: string, session: string
) {
  return axios.post(baseUrl, { traineesPresent, trainingId, date, session }, {
    headers: { "content-type": "application/json" },
  });
}