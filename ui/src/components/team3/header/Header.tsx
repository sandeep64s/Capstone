import React, { useState } from "react";
import './header.styles.css'
import { useSelector } from "react-redux";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { selectLimit, selectPage } from "../../../store/trainings/trainingsSlice";
import AddTraining from "../addTraining/AddTraining";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  console.log("location");
  console.log(window.location);
  const [toggleValue, setToggleValue] = useState({
    modal: false
  })

  const toggleCreateTrainingModal = () => {
    setToggleValue({
      ...toggleValue,
      modal: !toggleValue.modal,
    })
  }
  const pageDetails = { page: useSelector(selectPage), limit: useSelector(selectLimit) };
  return (
    <div className="navbar-container-header">
      <Navbar className="navbar-color-header" dark expand="xs">
        {/* <NavbarBrand href="/" className="ml-3">Home</NavbarBrand> */}
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className="training-navlink ml-3 "><Link className="training-navlink" to="/Dashboard/Trainings" style={{ textDecoration: "none", }}>Training</Link></NavLink>
          </NavItem>
          <NavItem>
            {
              !window.location.href.match('ViewTraining')?<NavLink onClick={toggleCreateTrainingModal} style={{ cursor: "pointer" }}>Add Training</NavLink>:null
            }

            
          </NavItem>

        </Nav>

        <Modal centered isOpen={toggleValue.modal} toggle={toggleCreateTrainingModal}>
          <ModalHeader>Add Training Form</ModalHeader>
          <ModalBody><AddTraining toggle={toggleCreateTrainingModal} pageDetails={pageDetails} /></ModalBody>
        </Modal>
      </Navbar>

    </div>
  );

}

export default AppNavbar;
