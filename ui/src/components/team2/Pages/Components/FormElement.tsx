import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../utils/Button";
import { Input } from "../../utils/Input";
import { Select } from "../../utils/Select";
import { api } from "../../api/api";
import styled from "styled-components";
import * as yup from "yup";
import { parse, isDate, getDate } from "date-fns";
import { getDateFormat } from "../../helpers/getDateFormat";

interface applicationData {
  name: string;
  companyName: string;
  dateStart: string;
  dateEnd: string;
  stack: string;
  trainingType: string;
  email: string;
}

interface formProps {
  initialData: applicationData;
  method: string;
  endpoint: string;
  setData: any;
  toggle?: any;
}

interface messageBoxProps {
  message: string;
  type: string;
}

function FormElement({
  initialData,
  method,
  toggle = () => {},
  endpoint,
  setData,
}: formProps) {
  const [details, setDetails] = useState(initialData);
  const [messageTypeColor, setMessageTypeColor] = useState<null | string>(null);
  const today = new Date();

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.currentTarget.name]: e.currentTarget.value });
  };

  const parseDateString = (value: any, originalValue: any) => {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "yyyy-MM-dd", new Date());
    return parsedDate;
  };

  let schema = yup.object().shape({
    name: yup.string().required("Name is required."),
    companyName: yup.string().required("Company name is required."),
    // dateEnd: yup
    //   .date()
    //   .transform(parseDateString)
    //   .required("End date is required."),
    // dateStart: yup
    //   .date()
    //   .transform(parseDateString)
    //   .min(today)
    //   .required("Start date is required."),
    stack: yup.string().required("Stack is required."),
    email: yup.string().email().required("Email is required."),
    trainingType: yup.string().required("Training type is required."),
  });

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    console.log(
      {
        ...details,
        dateEnd: getDateFormat(details.dateEnd),
        dateStart: getDateFormat(details.dateStart),
      },
      details
    );
    schema
      .isValid({
        ...details,
        dateEnd: getDateFormat(details.dateEnd),
        dateStart: getDateFormat(details.dateStart),
      })
      .then((isValid) => {
        !isValid
          ? setMessageTypeColor("rgb(255,0,0,0.2)")
          : api(method, endpoint, {
              ...details,
              dateEnd: getDateFormat(details.dateEnd),
              dateStart: getDateFormat(details.dateStart),
            }).then((res: any) => {
              setDetails(initialData);
              setData(res.data);
              setMessageTypeColor("rgb(0,0,255,0.2)");
              toggle();
            });
      });
  };

  useEffect(() => {
    let today = new Date().toISOString().split("T")[0];
    document.getElementsByName("dateStart")[0].setAttribute("min", today);
    document
      .getElementsByName("dateEnd")[0]
      .setAttribute("min", details.dateStart);
  }, [details]);

  const MessageBox = styled.span`
    background: ${messageTypeColor};
    border-radius: 3px;
    padding: 20px;
    margin-bottom: 10px;
  `;

  return (
    <React.Fragment>
      <Container>
        <Form>
          {messageTypeColor !== null && (
            <MessageBox>
              {messageTypeColor === "rgb(0,0,255,0.2)"
                ? "Application submitted successfully."
                : "Please fill all the fields properly."}
            </MessageBox>
          )}
          <Input
            onChange={handleInput}
            name="name"
            placeholder="Employee name"
            title="Name"
            value={details.name}
          />
          <Input
            onChange={handleInput}
            name="companyName"
            placeholder="Company name"
            title="Company Name"
            value={details.companyName}
          />
          <Input
            onChange={handleInput}
            name="email"
            placeholder="Email"
            title="Email"
            value={details.email}
          />
          <Input
            onChange={handleInput}
            name="dateStart"
            title="Start Date"
            type="date"
            value={details.dateStart && getDateFormat(details.dateStart)}
          />
          <Input
            onChange={handleInput}
            name="dateEnd"
            title="End Date"
            type="date"
            value={details.dateEnd && getDateFormat(details.dateEnd)}
          />
          <Select
            onChange={handleInput}
            name="trainingType"
            title="Training Type"
            value={details.trainingType ? details.trainingType : "none"}
          >
            <option value="none" disabled hidden>
              select...
            </option>
            <option value="full">Full</option>
            <option value="half">Half</option>
          </Select>
          <Input
            onChange={handleInput}
            name="stack"
            title="Stack"
            placeholder="Tech Stack"
            value={details.stack}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default FormElement;
