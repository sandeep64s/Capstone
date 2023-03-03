import { Formik, Field, Form } from "formik";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import * as Yup from "yup";
import { postTrainee, resetError } from "../../../store/trainee/traineeSlice";

//? EXPECTED BEHAVIOUR:
// User (trainee) already exists in database
// This form will be used by the admin to select trainings
// traineeId exists as user is logged in

const Validations = Yup.object().shape({
  email: Yup.string().email("Enter Valid Email").required("Email Required"),
  training: Yup.object().shape({
    trainingId: Yup.number().required(),
    name: Yup.string().required(),
  }),
});

interface FormValues {
  email: string;
  training: string;
}

export default function AddForm() {
  const initialValues: FormValues = {
    email: "",
    training: "",
  };

  const dispatch = useAppDispatch();
  const [errorMessage, trainingState] = useAppSelector((state) => [
    state.trainee.error,
    state.trainings.trainings,
  ]);

  const trainingObject = trainingState.map((training) => {
    return {
      trainingId: training.trainingId,
      name: training.title,
    };
  });

  return (
    <>
      {errorMessage && (
        <>
          {console.log(trainingObject)}
          {console.log(errorMessage)}
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
              dispatch(
                postTrainee({
                  ...data,
                  training: JSON.parse(data.training),
                })
              );
              console.log(data);
              alert("Data Submitted, Checking for Errors...");
            }}
          >
            {({ errors, touched, values, handleChange }) => (
              <Form className="w-full max-w-lg border-gray-700">
                <div className="mb-8">
                  <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">
                    EMAIL
                  </label>
                  <Field
                    id="email"
                    type="input"
                    value={values.email}
                    className="block pr-10 shadow appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-orange-200 transition duration-500"
                  />
                  {touched.email && errors.email ? (
                    <div className="text-red-600 text-xs font-semibold italic">
                      {" "}
                      {errors.email}{" "}
                    </div>
                  ) : null}
                </div>

                <div className="mb-8">
                  <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">
                    TRAININGS
                  </label>
                  <div className="relative">
                    <select
                      id="training"
                      onChange={handleChange}
                      className="block pr-10 shadow appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-orange-200 transition duration-500"
                    >
                      <option id="" value="">
                        Select
                      </option>

                      {trainingObject.map(({ trainingId, name }) => {
                        return (
                          <option
                            key={trainingId}
                            value={JSON.stringify({
                              trainingId,
                              name,
                            })}
                          >
                            [{trainingId}] {name}
                          </option>
                        );
                      })}
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
