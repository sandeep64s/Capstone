import { Router } from "express";
import { addUser, verifyEmail } from "./SignUpPage.controller";

const router = Router();

router.route('/').post(addUser);

router.route("/verify/:signKey").get(verifyEmail);

export default router;