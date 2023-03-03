import { Router, Request, Response } from "express";
import TrainingRoutes from './routes/training/TrainingPage.routes'
import LoginPageRoutes from "./routes/admin/loginPage/loginPage.routes";
import SignUpPageRoutes from "./routes/admin/signUpPage/SignUpPage.routes";
import { traineeRouter } from "./routes/trainee";
import trainerRouter from "./routes/trainer/trainer";
import instructorRouter  from "./routes/instructorPage/instructorPage.routes";
import attendanceRouter  from "./routes/attendance/attendancePage.routes";

const router = Router();

router.use("/login", LoginPageRoutes);

router.use("/signup", SignUpPageRoutes);

router.use("/trainee", traineeRouter);

router.use('/trainings',TrainingRoutes);

router.use('/instructor',instructorRouter);

router.use('/trainer',trainerRouter);
router.use('/attendance',attendanceRouter);

export default router;
