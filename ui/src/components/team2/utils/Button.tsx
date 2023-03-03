import styled from "styled-components";

export const Button = (props: any) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

const StyledButton = styled.button`
  font-family: "Poppins", sans-serif;
  padding: 0.5rem;
  border: 1px solid #222;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.25s linear;
  background: #222;
  color: white;
  &:hover {
    background: white;
    color: #222;
  }
`;
