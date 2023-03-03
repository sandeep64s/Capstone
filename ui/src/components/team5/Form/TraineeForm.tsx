import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { resetError, updateTrainee } from "../../../store/trainee/traineeSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Trainee } from "../../../types";

//? EXPECTED BEHAVIOUR:
// User (trainee) already exists in database
// This form will be used by the user to complete their profile
// traineeId exists as user is logged in

const Validations = Yup.object().shape({
  name: Yup.string()
    .min(1, "Name must have atleast 2 charecters")
    .required("Name Required")
    .matches(/^[A-Za-z ]*$/, "Name must not contain Numbers"),

  dob: Yup.date()
    .required("DOB is Required")
    .min("1912-01-01", "Trainee must be atmost 110 years old")
    .max("2007-01-01", "Trainee must be atleast 15 years old"),

  gender: Yup.string().required("Gender Required"),
});

interface FormValues {
  name: string;
  dob: string;
  gender: string;
  resume: File | undefined;
  profilePic?: File;
}

export default function TraineeForm(props?: Trainee) {
  const initialValues: FormValues = {
    name: props ? (props.name ? props.name : "") : "",
    dob: props
      ? props.dob
        ? props.dob
        : new Date().toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    gender: props ? (props.gender ? props.gender.toString() : "") : "",
    resume: undefined,
    profilePic: undefined,
  };

  const dispatch = useAppDispatch();
  const loggedInUserId = 22080001; //! this will be provided by admin module
  const traineeId = props
    ? props.traineeId
      ? props.traineeId
      : loggedInUserId
    : loggedInUserId;

  console.log(traineeId);
  const errorMessage = useAppSelector((state) => state.trainee.error);

  //ADD STATE AND SETSTATE FOR PROFILE-PIC

  return (
    <>
      {errorMessage && (
        <>
          <div className="justify-center items-center flex overflow-x-scroll overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto min-w-max">
              {/*content*/}
              <div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div>
                  <button
                    className="p-1 ml-auto border-0 text-white opacity-80 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => dispatch(resetError())}
                  >
                    <span className=" text-red-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 pt-4 pb-2 flex-auto">
                  <div className="text-red-500 font-semibold italic">
                    {errorMessage}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      <div>
        <div className="bg-white">
          <Formik
            bg-slate-900
            initialValues={initialValues}
            validationSchema={Validations}
            onSubmit={(data) => {
              const formData = new FormData();
              formData.append("name", data.name);
              formData.append("dob", data.dob);
              formData.append("gender", data.gender);
              alert("Data Submitted Successfully");
              if (data.profilePic) {
                formData.append("profilePic", data.profilePic, "profilePic");
              }
              if (data.resume) {
                formData.append("resume", data.resume, "resume");
              }
              dispatch(
                updateTrainee({
                  object: formData,
                  id: traineeId,
                })
              );
              console.log(data);
            }}
          >
            {({ errors, touched, values, handleChange, setFieldValue }) => (
              <Form className="w-full max-w-lg border-gray-700">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div>
                    <img
                      className="w-12 h-12 mr-4 ml-4 object-cover"
                      src={
                        props
                          ? props.profilePic
                            ? `${import.meta.env.VITE_SERVERURL}/static/profilePic/` +
                            props.profilePic.filename
                            : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                          : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                      }
                      alt="Avatar Upload"
                    />
                  </div>
                  <label className="cursor-pointer mt-3">
                    <Field
                      className="text-black bold hover:text-gray-700"
                      name="profilepic"
                      type="file"
                      accept="image/png, image/jpeg"
                      id="profilepic"
                      onChange={(event: {
                        currentTarget: {
                          files: FileList;
                        };
                      }) => {
                        setFieldValue(
                          "profilePic",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  </label>
                </div>

                <div className="mb-8">
                  <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">
                    NAME
                  </label>
                  <Field
                    id="name"
                    type="input"
                    value={values.name}
                    className="block pr-10 shadow appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-orange-200 transition duration-500"
                  />
                  {touched.name && errors.name ? (
                    <div className="text-red-600 text-xs font-semibold italic">
                      {" "}
                      {errors.name}{" "}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-wrap -mx-3">
                  <div className="w-full md:w-3/5 px-3 mb-6">
                    <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">
                      DATE OF BIRTH
                    </label>
                    <Field
                      id="dob"
                      type="date"
                      value={values.dob}
                      className="block pr-10 shadow appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-orange-200 transition duration-500"
                    />
                    {errors.dob && touched.dob ? (
                      <div className="text-red-600 text-xs font-semibold italic">
                        {errors.dob}{" "}
                      </div>
                    ) : null}
                  </div>

                  <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                    <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">
                      GENDER
                    </label>
                    <div className="relative">
                      <select
                        id="gender"
                        onChange={handleChange}
                        className="block pr-10 shadow appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-orange-200 transition duration-500"
                      >
                        <option id="" value="">
                          Select
                        </option>
                        <option id="male" value="Male">
                          Male
                        </option>
                        <option id="female" value="Female">
                          Female
                        </option>
                        <option id="other" value="Other">
                          Other
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    {touched.gender ? <div> {touched.gender} </div> : ""}
                    <div className="text-red-600 text-xs font-semibold italic">
                      <ErrorMessage name="gender" />
                    </div>
                  </div>
                </div>

                <label className="tracking-wide p-0 text-gray-700 text-xs font-bold mb-2">
                  UPLOAD RESUME
                </label>
                <div className="mt-1 mb-3 flex justify-center p-4 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <Field
                        id="uploadResume"
                        name="uploadResume"
                        required
                        type="file"
                        accept="image/png, .pdf"
                        onChange={(event: {
                          currentTarget: {
                            files: FileList;
                          };
                        }) => {
                          setFieldValue("resume", event.currentTarget.files[0]);
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">PDF, PNG files only</p>
                  </div>
                </div>

                <div className="mb-4 text-center">
                  <button
                    type="submit"
                    className="transition duration-300 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
