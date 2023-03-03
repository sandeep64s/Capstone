import axios from "axios";

const VITE_SERVERURL = import.meta.env.VITE_SERVERURL;
const URL = `${VITE_SERVERURL}/api/v1/instructor`

interface dataInterface {
  name: String,
  companyName: String,
  dateStart: String,
  dateEnd: String,
  trainingType: String,
  stack: String,
}

export const api = (method: string, endpoint: string, data: dataInterface | {} = {}) => {
  // console.log(method, endpoint, data, `${URL}/${endpoint}`)
  return axios({
    method,
    url: `${URL}/${endpoint}`,
    data,
  }).then((response) => response.data);
};
