import { ObjectId } from "mongodb";

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
  resume?: File;
  profilePic?: File;
  _id?: ObjectId;
};

export type InitialState = {
  loading: boolean;
  trainees: Trainee[];
  page: {
    perPage: number;
    pageCount: number;
    total: number;
    currentPage: number;
  };
  error?: string;
};

export type PostTrainee = {
  email: string;
  training: {
    trainingId: number;
    name: string;
  };
};

enum Gender {
  Male,
  Female,
  Others,
}
