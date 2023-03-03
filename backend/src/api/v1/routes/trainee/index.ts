import { Router, Request, Response } from "express";
import multer from "multer";
import {
  createTrainee,
  deleteTrainee,
  getTraineeById,
  getTrainees,
  patchTrainee,
  updateTrainee,
} from "./trainee.controller";

// Storage setup to store files in the server
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    file.fieldname === "resume"
      ? cb(null, "uploads/resume")
      : cb(null, "uploads/profilePic");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${req.body.name}_${file.fieldname}_${Date.now()}.${
        file.mimetype.split("/")[1]
      }`
    );
  },
});

const upload = multer({ storage: storage });

const traineeUploads = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePic", maxCount: 1 },
]);

export const traineeRouter: Router = Router();

traineeRouter.route("/").get(getTrainees).post(createTrainee);

traineeRouter
  .route("/:id")
  .get(getTraineeById)
  .put(traineeUploads, updateTrainee)
  .delete(deleteTrainee)
  .patch(patchTrainee);
