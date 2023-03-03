import express from "express";
import {
  apply,
  applications,
  removeApplication,
  editApplication,
} from "./instructorPage.controller";

const router = express();

//api endpoints
router.post("/apply", apply);
router.get("/applications", applications);
router.delete("/applications/:_id", removeApplication);
router.patch("/applications/:_id", editApplication);

export default router;