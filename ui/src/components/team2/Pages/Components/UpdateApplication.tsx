import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import FormElement from "./FormElement";

interface applicationData {
  _id: string;
  name: string;
  companyName: string;
  dateStart: string;
  dateEnd: string;
  stack: string;
  trainingType: string;
  email: string;
}

interface modalProps {
  open: boolean;
  data: applicationData;
  setData: (data: applicationData[]) => void;
  toggle: (e?: any) => void;
}

function UpdateApplication({ open, data, toggle, setData }: modalProps) {
  return (
    <div className="modal-container">
      {data && (
        <Modal isOpen={open} toggle={toggle}>
          <ModalBody>
            <FormElement
              setData={setData}
              initialData={data}
              toggle={toggle}
              method="PATCH"
              endpoint={`/applications/${data._id}`}
            />
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}

export default UpdateApplication;
