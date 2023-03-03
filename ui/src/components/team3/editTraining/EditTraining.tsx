import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EditTrainingProps, TrainingType } from '../../../types/types';
import './EditTraining.css'
import { editTrainingThunk } from "../../../store/trainings/trainingsSlice";
import { useAppDispatch } from "../../../store";
import DateToHTML from "../dateToHtml/DateToHtml"
import { DatePickerField } from "../addTraining/AddTraining";
import "./EditTraining.css";

function dateDiffInDays(a: Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY) + " days";
}
const EditTraining = ({ toggleEditModal, trainingData }: EditTrainingProps) => {

    const training: TrainingType = {
        trainingId: trainingData.trainingId,
        title: trainingData.title,
        description: trainingData.description,
        trainingStartDate: (trainingData.trainingStartDate && DateToHTML(trainingData.trainingStartDate)),
        trainingEndDate: (trainingData.trainingEndDate && DateToHTML(trainingData.trainingEndDate)),
        techStack: trainingData.techStack
    };
    console.log(training)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const editTrainingHandler = (training: TrainingType) => {
        console.log(training)
        dispatch<any>(editTrainingThunk(training)).then(() => {
            toggleEditModal();
            alert("Edited training");
            navigate(`/Dashboard/Trainings/ViewTraining/${encodeURIComponent(training.trainingId!)}`)
        });

    }
    return (
        <Formik
            initialValues={training}
            validate={values => {
                const errors: any = {};
                if (!values.title) {
                    errors.title = 'Title is Required';
                }
                if ((/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/).test(values.title!)
                ) {
                    errors.title = 'Title Cannot contain special characters or numbers'
                }
                if (!values.description) {
                    errors.description = 'Description is Required';
                }
                if (!values.trainingStartDate) {
                    errors.trainingStartDate = 'Training Start Date is Required';
                }
                if (!values.trainingEndDate) {
                    errors.trainingEndDate = 'Training End Date is Required';
                }
                if (!values.techStack) {
                    errors.techStack = 'Tech Stack is Required';
                }
                if (
                    parseInt(
                        dateDiffInDays(
                            new Date(values.trainingStartDate!),
                            new Date(values.trainingEndDate!)
                        )
                    ) < 0
                ) {
                    errors.trainingEndDate =
                        "Ending Date must be greater than starting Date";
                }

                return errors;

            }}

            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                console.log(values)
                editTrainingHandler(values);
            }}

        >

            {({ values, isSubmitting, isValid, errors, touched }) => (
                <Form className="form-training">
                    <div className="form-group row py-sm-2 px-sm-3">
                        <label htmlFor="trainingId" className="col-sm-3 col-form-label ">Training Id</label>
                        <div className="col-sm-9">
                            <Field className={`form-control ${touched.trainingId && errors.trainingId ? "is-invalid" : ""
                                }`} type="text" name="trainingId" placeholder="trainingId" disabled />
                        </div>
                    </div>
                    <div className="form-group row py-sm-2 px-sm-3">
                        <label htmlFor="title" className="col-sm-3 col-form-label ">Title</label>
                        <div className="col-sm-9">
                            <Field className={`form-control ${touched.title && errors.title ? "is-invalid" : ""
                                }`} type="text" name="title" placeholder="title" />

                            <ErrorMessage name="title" component="span" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group row py-sm-2 px-sm-3">
                        <label htmlFor="techStack" className="col-sm-3 col-form-label ">Tech Stacks</label>
                        <div className="col-sm-9">
                            <Field className={`form-control ${touched.techStack && errors.techStack ? "is-invalid" : ""
                                }`} type="text" name="techStack" placeholder="techStack" />

                            <ErrorMessage name="techStack" component="div" className="invalid-feedback" />
                        </div>
                    </div>

                    <div className="form-group row py-sm-2 px-sm-3">
                        <label htmlFor="description" className="col-sm-3 col-form-label ">Description</label>
                        <div className="col-sm-9">
                            <Field className={`form-control ${touched.description && errors.description ? "is-invalid" : ""
                                }`} type="text" component="textarea" name="description" rows="4" placeholder="description" />

                            <ErrorMessage name="description" component="div" className="invalid-feedback" />
                        </div>
                    </div>

                    <div className="form-group row py-sm-1 px-sm-3">
                        <label htmlFor="trainingStartDate" className="col-sm-3 col-form-label">Start Date:</label>
                        <div className="col-sm-7">
                            <DatePickerField className={`form-control ${touched.trainingStartDate && errors.trainingStartDate ? "is-invalid" : ""
                                }`} name="trainingStartDate" placeholder="mm/dd/yyyy" />
                            {
                                touched.trainingStartDate && errors.trainingStartDate ? (<div className="error-message">
                                    {errors.trainingStartDate}
                                </div>) : (null)
                            }
                        </div>
                    </div>

                    <div className="form-group row py-sm-2 mx-sm-1">
                        <label htmlFor="trainingEndDate" className="col-sm-3 col-form-label ">End Date:</label>
                        <div className="col-sm-7">
                            <DatePickerField className={`form-control ${touched.trainingEndDate && errors.trainingEndDate ? "is-invalid" : ""
                                }`} name="trainingEndDate" placeholder="mm/dd/yyyy" minDate={values.trainingStartDate} />
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

export default EditTraining;