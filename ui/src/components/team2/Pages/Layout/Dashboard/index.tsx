import React from 'react';
import styled from "styled-components";
import Nav from '../Nav';
import "../../styles/index.css";

interface hocProp {
  children: JSX.Element | JSX.Element[]
}

const Dashboard: React.FC<hocProp> = ({ children }: hocProp) => (
  <React.Fragment>
    <NavWrapper>
      <Nav />
    </NavWrapper>
    <ContentWrapper>
      {children}
    </ContentWrapper>
  </React.Fragment>
);

const NavWrapper = styled.section`
  display: flex;
  padding: 2.5rem 1rem;
  align-items: flex-start;
  justify-content: center;
  width: 75px;
  z-index:3;
  height: 100%;
  background: white;
  border-right: 1px solid #CCCCCC;
  margin-right: 20px;
`;


const ContentWrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

// const Header = styled.section`
//   width: 100%;
// `;

export default Dashboard;
