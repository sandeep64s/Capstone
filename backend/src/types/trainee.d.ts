import { ObjectId } from "mongodb";

// NOTE: Basic account details added already and the form to complete
// Expected date : "2022-08-26"
export type Trainee = {
  traineeId: number;
  email: string;
  password: string;
  training: {
    trainingId: number;
    name: string;
  };
  isDeleted: boolean;
  isValid: boolean;
  name?: string;
  dob?: string;
  gender?: Gender;
  resume?: {
    filename: string;
    path: string;
    size: number;
    type: string;
  };
  profilePic?: {
    filename: string;
    path: string;
    size: number;
    type: string;
  };
  _id?: ObjectId;
};

export enum Gender {
  Male,
  Female,
  Others,
}
