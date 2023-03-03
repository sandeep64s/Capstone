import { ObjectId } from "mongodb";

export interface Trainer {
  _id: ObjectId | string;
  // trainerId: number ,
  trainerName: string;
  trainerCourse: {
    trainingId: string;
    title: string;
  };
  trainerAvailability: boolean;
  trainerExperience: number | string;
  isActive: boolean;
  trainerEmail: string;
  trainerLocation: string;
  trainerGender: string;
  trainerJoiningDate: string | Date;
}
