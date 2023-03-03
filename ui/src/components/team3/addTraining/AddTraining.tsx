import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useField, useFormikContext } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch } from "../../../store";
import { addTrainingThunk, PageDetails } from '../../../store/trainings/trainingsSlice';
import { TrainingType } from "../../../types/types";
import "./AddTraining.css"
interface AddTraining {
    trainingStartDate: Date,
    trainingEndDate: Date,
    description: string,
    techStack: string,
    title: string
}

interface ToggleType {
    toggle: () => void;
}

interface AddTrainingProps {
    pageDetails: PageDetails;
    toggle: Function;
}

function dateDiffInDays(a: Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY) + " days";
}

export const DatePickerField = ({ ...props }: any) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <>
            <DatePicker
                dateFormat="dd/MM/yyyy"
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={(date: Date) => {
                    //     console.log(date);
                    //     console.log(new Date(date).toDateString());
                    //    console.log(date.getTime());
                    //    console.log(new Date().getTimezoneOffset()*60*1000);

                    //solution 1: uncomment this below and  uncomment line - 60
                    // if(date){
                    //     date.setTime( date.getTime() - new Date().getTimezoneOffset()*60*1000 );
                    // }     
                    const newval = new Date(`${date}`).toDateString(); // SOLUTION 2: use toDateString();
                    // const newval = new Date(`${date}`).toISOString().split('T')[0];
                    console.log(newval);
                    setFieldValue(field.name, newval);
                }}
            />
            {/* <ErrorMessage name={field.name} component="div" className="invalid-feedback" /> */}
        </>
    );
};

const AddTraining = ({ toggle, pageDetails }: AddTrainingProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const addTrainingHandler = (training: TrainingType) => {

        dispatch(addTrainingThunk({ training, pageDetails })).then(() => {
            toggle();// navigate("/Trainings");
            setTimeout(() => { alert("New Training Added Successfully") }, 100);
        })
            .catch((err) => alert(JSON.stringify(err.message)))
        // createTraining(training).then(res => {alert("Added training"+ training); w.location="/"});
    }
    const startDateChangeHandler = (e: ChangeEvent) => {
        // document.getElementsByName('trainingEndDate').minDate = (e.target as HTMLInputElement).value
    }
    const formInitialValues = {
        trainingStartDate: '',
        trainingEndDate: '',
        description: '',
        techStack: '',
        title: ''
    }
    return (
        <Formik
            initialValues={formInitialValues}

            validate={values => {
                const errors: any = {};
                if (!values.title) {
                    errors.title = 'Title Required';
                }
                if (!values.techStack) {
                    errors.techStack = 'Tech Stacks is Required';
                }
                if (!values.description) {
                    errors.description = 'Description is Required';
                }
                if (!values.trainingStartDate) {
                    errors.trainingStartDate = 'Starting Date Required'
                }
                if (!values.trainingEndDate) {
                    errors.trainingEndDate = 'Ending Date Required'
                }

                if (parseInt(dateDiffInDays(new Date(values.trainingStartDate), new Date(values.trainingEndDate))) < 0) {
                    errors.trainingEndDate = 'Ending Date must be greater than starting Date'
                }
                if (parseInt(dateDiffInDays(new Date(), new Date(values.trainingStartDate))) < 0) {
                    errors.trainingStartDate = 'Starting Date cannot be a past date'
                }
                if ((/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/).test(values.title)) {
                    errors.title = 'Title Cannot contain special characters'
                }
                return errors;

            }}

            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                console.log(values)
                addTrainingHandler(values);
            }}

        >

            {({ values, isSubmitting, isValid, errors, touched }) => (
                <Form className="form-training">
                    <div className="form-group row py-sm-1 px-sm-3">
                        <Field className={`form-control ${touched.title && errors.title ? "is-invalid" : ""
                            }`} type="text" name="title" placeholder="title" />
                        <ErrorMessage name="title" component="span" className="invalid-feedback" />
                    </div>

                    <div className="form-group row py-sm-2 px-sm-3">
                        <Field className={`form-control ${touched.techStack && errors.techStack ? "is-invalid" : ""
                            }`} type="text" name="techStack" placeholder="techStack" />

                        <ErrorMessage name="techStack" component="div" className="invalid-feedback" />
                    </div>

                    <div className="form-group row py-sm-2 px-sm-3">
                        <Field className={`form-control ${touched.description && errors.description ? "is-invalid" : ""
                            } `} component="textarea" rows="4" name="description" placeholder="description" />

                        <ErrorMessage name="description" component="div" className="invalid-feedback" />
                    </div>

                    {/* <div className="form-group row py-sm-2 mx-sm-1">
                        <label htmlFor="trainingStartDate" className="col-sm-3 col-form-label">Start Date:</label>
                        <div className="col-sm-7">
                            <Field className={`form-control ${touched.trainingStartDate && errors.trainingStartDate ? "is-invalid" : ""
                                } form`} type="date" name="trainingStartDate" placeholder="startDate" min={new Date()}/>
                            <ErrorMessage name="trainingStartDate" component="div" className="invalid-feedback" />
                        </div>
                    </div> */}

                    <div className="form-group row py-sm-1 px-sm-3">
                        <label htmlFor="trainingStartDate" className="col-sm-3 col-form-label">Start Date:</label>
                        <div className="col-sm-7">
                            <DatePickerField className={`form-control ${touched.trainingStartDate && errors.trainingStartDate ? "is-invalid" : ""
                                }`} name="trainingStartDate" minDate={new Date()} placeholder="mm/dd/yyyy" onChange={startDateChangeHandler} />
                            {
                                touched.trainingStartDate && errors.trainingStartDate ? (<div className="error-message">
                                    {errors.trainingStartDate}
                                </div>) : null
                            }
                        </div>
                    </div>

                    <div className="form-group row py-sm-2 mx-sm-1">
                        <label htmlFor="trainingEndDate" className="col-sm-3 col-form-label ">End Date:</label>
                        <div className="col-sm-7">
                            <DatePickerField className={`form-control ${touched.trainingEndDate && errors.trainingEndDate ? "is-invalid" : ""
                                }`} name="trainingEndDate" minDate={new Date(values.trainingStartDate)} placeholder="mm/dd/yyyy" />
                            {
                                touched.trainingEndDate && errors.trainingEndDate ? (<div className="error-message">
                                    {errors.trainingEndDate}
                                </div>) : (null)
                            }
                        </div>

                    </div>






                    <button type="submit" className="btn" disabled={isSubmitting} style={{ backgroundColor: "rgba(37, 117, 252, 1)", color: "white" }}>
                        Submit
                    </button>

                </Form>
            )}

        </Formik>
    )
}

export default AddTraining;