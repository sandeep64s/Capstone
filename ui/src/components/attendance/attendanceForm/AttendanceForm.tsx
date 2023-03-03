import "./AttendanceForm.css";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useField, useFormikContext } from 'formik';
import { DatePickerField } from "../../team3/addTraining/AddTraining";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchTrainings, selectTrainings } from "../../../store/trainings/trainingsSlice";
import { useEffect } from 'react';
const AttendanceForm = () => {
    const formInitialValues = {
        date: '',
        trainingId: '',
        session: 'M',
        sessionExists: false
    };
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const addAttendanceHandler = (attendance: any) => {
        console.log(attendance);
        // dispatch(createAttendance(attendance));
        setTimeout(() => {
            if (attendance.sessionExists) navigate(`/Attendance/${attendance.trainingId}/${attendance.date}/${attendance.session}`);
            else navigate(`/Attendance/${attendance.trainingId}/${attendance.date}`);
        }, 1500)
    }
    const trainingState = useAppSelector(selectTrainings);
    useEffect(() => {
        dispatch(fetchTrainings());
    }, [])
    //TODO restrict training ID by trainer ID supplied
    const trainingObject = trainingState.map((training) => {
        return {
            trainingId: training.trainingId,
            name: training.title,
        };
    });

    return (
        <div className="container card mt-5 mb-5 pt-5 pb-5">
            <Formik
                initialValues={formInitialValues}

                validate={values => {
                    const errors: any = {};
                    if (!values.date) {
                        errors.date = 'Date Required';
                    }
                    if (!values.trainingId) {
                        errors.trainingId = 'TrainingId is Required';
                    }
                    if (values.sessionExists && !values.session) {
                        errors.session = 'Session is Required';
                    }
                    return errors;
                }}

                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    addAttendanceHandler({ ...values, date: new Date(values.date).toISOString().split("T")[0] });
                }}
            >

                {({ values, isSubmitting, isValid, errors, touched, handleChange }) => (
                    <Form className="form-training">

                        <div className="form-group row py-sm-1 px-sm-3">
                            <label className="col-sm-3 col-form-label">TRAININGS</label>
                            <div className="col-sm-7">
                                <select
                                    id="trainingId"
                                    onChange={handleChange}
                                    className={`form-control ${touched.trainingId && errors.trainingId ? "is-invalid" : ""
                                        }`}
                                >
                                    <option id="" value="">
                                        Select
                                    </option>

                                    {trainingObject.map(({ trainingId, name }) => {
                                        return (
                                            <option
                                                key={trainingId}
                                                label={
                                                    `${trainingId} - ${name}`
                                                }
                                                value={trainingId}
                                            >
                                                {trainingId} - {name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <ErrorMessage name="trainingId" component="span" className="invalid-feedback" />
                        </div>



                        <div className="form-group row py-sm-1 px-sm-3">
                            <label className="col-sm-3 col-form-label">Date</label>
                            <div className="col-sm-7">
                                <DatePickerField className={`form-control ${touched.date && errors.date ? "is-invalid" : ""
                                    }`} name="date" minDate={new Date()} placeholder="mm/dd/yyyy" />
                                {
                                    touched.date && errors.date ? (<div className="error-message">
                                        {errors.date}
                                    </div>) : null
                                }
                            </div>
                        </div>

                        <div className="form-group row py-sm-2 px-sm-3">
                            <label className="col-sm-3 col-form-label">
                                <Field type="checkbox" name="sessionExists" />
                                {values.sessionExists ? "Session" : "No session"}
                            </label>
                            {values.sessionExists &&
                                <div className="col-sm-7">
                                    <Field className={`form-control ${touched.session && errors.session ? "is-invalid" : ""
                                        } `} component="select" name="session" placeholder="session">
                                        <option value="M">Morning</option>
                                        <option value="E">Evening</option>
                                    </Field>

                                    <ErrorMessage name="description" component="div" className="invalid-feedback" /></div>
                            }


                            <ErrorMessage name="description" component="div" className="invalid-feedback" />
                        </div>



                        <button type="submit" className="btn" disabled={isSubmitting} style={{ backgroundColor: "rgba(37, 117, 252, 1)", color: "white" }}>
                            Submit
                        </button>

                    </Form>
                )}

            </Formik>
        </div>
    );
}

export default AttendanceForm;