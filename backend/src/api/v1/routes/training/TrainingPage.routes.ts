import { Router } from "express";
// import { addLogin } from "./signUpPage.controller";

const {getTrainings, getTraining,createTraining,updateTraining,deleteTraining} = require('./TrainingPage.controller');

const router = Router();

router
    .route('/')
    .get(getTrainings)
    .post(createTraining);

router
    .route('/:id')
    .get(getTraining)
    .patch(updateTraining)
    .delete(deleteTraining);

export default router;