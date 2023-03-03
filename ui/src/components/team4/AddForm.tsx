import "./TrainerRoute.css";
import { Field, Formik } from "formik";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);
import InputField from "./InputField";
import MultiStep, { FormStep } from "./MultiStep";
import { useAppSelector, useAppDispatch } from "./hooks/Hooks";
import { saveTrainers } from "../../store/trainer/trainerSlice";
import { useEffect, useState } from "react";
import { fetchTrainings } from "../../store/trainings/trainingsSlice";
import { TrainingType } from "../../types/types";
import { staticLocation, uniqueLocation } from "./util";

const validationSchema = yup.object({
  trainerName: yup.string().required("Mandatory Field "),
  trainerEmail: yup
    .string()
    .email("Enter valid email")
    .required("Mandatory Field"),
  trainerPassword: yup.string().password().required("Mandatory Field"),
});

const validationSchema2 = yup.object({
  trainerCourse: yup.string().required("Mandatory Field"),
  trainerLocation: yup.string().required("Mandatory Field"),
  trainerGender: yup.string().required("Mandatory Field"),
});

const validationSchema3 = yup.object({
  trainerExperience: yup.string().required("Mandatory Field"),
  trainerJoiningDate: yup.date().required("Mandatory Field"),
});

function App() {
  const dispatch = useAppDispatch();
  const Training = useAppSelector((state) => {
    return state.trainings.trainings;
  });

  useEffect(() => {
    dispatch(fetchTrainings());
  }, []);

  console.log(Training);

  return (
    <div className="App">
      <div className="form">
        <h1 className="title">Trainer's Form</h1>

        <MultiStep
          initialValues={{
            trainerName: "",
            trainerCourse: "",
            trainerAvailability: true,
            trainerExperience: "",
            trainerJoiningDate: "",
            isActive: true,
            trainerEmail: "",
            trainerGender: "",
            trainerLocation: "",
            trainerPasswaord: "",
          }}
          onSubmit={(values) => {
            alert("Saved Successfully");
            console.log(JSON.parse(values.trainerCourse));
            dispatch(
              saveTrainers({
                ...values,
                trainerCourse: JSON.parse(values.trainerCourse),
              })
            );
          }}
        >
          <FormStep
            stepName="Person"
            onSubmit={() => console.log("Step 1 submit")}
            validationSchema={validationSchema}
          >
            <InputField label="Trainer Name" name="trainerName" />

            <InputField label="Email" name="trainerEmail" />

            <InputField
              type="password"
              label="Set Password"
              name="trainerPassword"
            />
          </FormStep>

          <FormStep
            stepName="Details"
            onSubmit={() => console.log("Step 2 submit")}
            validationSchema={validationSchema2}
          >
            {/* <InputField label=" Subject" name="trainerCourse" /> */}
            <label>
                Training
              <Field className="gender-box" as="select" name="trainerCourse">
                <option value="">--Select--</option>
                {Training.map((training: TrainingType) => (
                  <option
                    key={training.trainingId}
                    value={JSON.stringify(training)}
                  >
                    {training.trainingId}-{training.title}
                  </option>
                ))}
              </Field>
            </label>
            <br />
            <label>
              Trainer Location
              <Field className="gender-box" as="select" name="trainerLocation">
                <option value="">--Select--</option>
                {uniqueLocation.map((Location: string, key: number) => (
                  <option key={key} value={Location}>
                    {Location}
                  </option>
                ))}
              </Field>
            </label>

            <br />
            <label>
              Gender:
              <Field className="gender-box" as="select" name="trainerGender">
                <option value="">--Select--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Field>
            </label>
          </FormStep>

          <FormStep
            stepName="Time"
            fullWidth
            onSubmit={() => console.log("Step 3 submit")}
            validationSchema={validationSchema3}
          >
            <InputField label="Experience in years" name="trainerExperience" />
            <br />
            <label className="box-label">
              Joining Date :
              <Field
                className="date-box"
                type="date"
                id="date"
                name="trainerJoiningDate"
                min={new Date().toISOString().split("T")[0]}
              />
            </label>
          </FormStep>
        </MultiStep>
        <a className="toHome" href="/Trainer">
          Home Page
        </a>
      </div>
    </div>
  );
}

export default App;
