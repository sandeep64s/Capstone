const mongoose = require("mongoose");

const instructorSchema = mongoose.Schema(
  {
    userId: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
      required: true,
    },
    trainingType: {
      type: String,
      required: true,
    },
    stack: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { collection: "InstructorForm" }
);

export const InstructorPage = mongoose.model("InstructorForm", instructorSchema);

