import { Router } from "express";

// import { addLogin } from "./signUpPage.controller";

import {updateAttendance,getAttendanceByDateForTraining,getAttendanceAll,createAttendance,getAttendance} from './attendancePage.controller';

const router = Router();

router
    .route('/')
    .get(getAttendance)
    .post(createAttendance)
    .patch(updateAttendance);
   

router
    .route('/all')
    .get(getAttendanceAll)
  

router
    .route('/byDate')
    .get(getAttendanceByDateForTraining);

export default router;