import styled from "styled-components";

export const Input = (props: any) => {
  return (
    <>
      <label htmlFor={props.title}>{props.title}</label>
      <StyledInput {...props} id={props.title} />
    </>
  );
};

export const StyledInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 10px 10px 10px 10px;
`;
