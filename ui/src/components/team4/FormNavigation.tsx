import { Button } from "@mui/material";
import { FormikValues } from "formik";

interface Props {
  hasPrevious?: boolean;
  onBackClick: (values: FormikValues) => void;
  isLastStep: boolean;
  formk: any;
}

const FormNavigation = (props: Props) => {
  return (
    <div
      className="form-parent"
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "space-between",
      }}
    >
      {props.hasPrevious && (
        <Button          
          color="warning"
          variant="contained" 
          type="button" 
          onClick={props.onBackClick}>
          Back
        </Button>
      )}

      {!props.isLastStep ? (
        <Button
          className="next-btn"
          type="submit"
          color="warning"
          variant="contained"
          disabled={!(props.formk.isValid && props.formk.dirty)}
        >
          Next
        </Button>
      ) : (
        <a>
          <Button
            className="next-btn"
            type="submit"
            color="warning"
            variant="contained"
            disabled={!(props.formk.isValid && props.formk.dirty)}          
            >
            Submit
          </Button>
        </a>
      )}
    </div>
  );
};

export default FormNavigation;
