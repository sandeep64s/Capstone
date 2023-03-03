import styled from "styled-components";

export const Select = (props: any) => {
  return (
    <>
      <label htmlFor={props.title}>{props.title}</label>
      <StyledSelect id={props.title} {...props}>
        {props.children}
      </StyledSelect>
    </>
  );
};

const StyledSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 10px 10px 10px 10px;
`;
