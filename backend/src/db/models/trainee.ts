import mongoose from "mongoose";
import dotenv from "dotenv";
// import { Gender } from "../../types/trainee";
dotenv.config();

const traineeSchema = new mongoose.Schema({
  traineeId: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: true,
  },
  training: {
    trainingId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  name: {
    type: String,
  },
  dob: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  resume: {
    type: Object || null,
  },
  profilePic: {
    type: Object || null,
  },
});

const TraineeCollection = mongoose.model(
  process.env.TRAINEE_COLLECTION as string,
  traineeSchema
);

export default TraineeCollection;
