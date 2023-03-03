import React, { useContext, useEffect } from "react";
import FormElement from "./FormElement";
import { ActiveContext } from "../Layout/Root";
import styled from "styled-components";

function Apply() {
  const initialValues = {
    name: "",
    companyName: "",
    dateStart: "",
    dateEnd: "",
    stack: "",
    trainingType: "",
    email: "",
  };

  const { setActiveTab } = useContext(ActiveContext);
  useEffect(() => {
    setActiveTab(4);
  });

  return (
    <React.Fragment>
      <div>
        <h1>Apply Page</h1>
      </div>
      <FormElement
        setData={() => { }}
        initialData={initialValues}
        method="POST"
        endpoint="/apply"
      />
    </React.Fragment>
  );
}

export default Apply;
