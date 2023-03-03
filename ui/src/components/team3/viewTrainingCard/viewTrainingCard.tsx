import React, { useState } from "react";
import "./viewTrainingCard.styles.css";
import { ViewTrainingProps } from "../../../types/types";
import { deleteTrainingThunk, editTrainingThunk } from "../../../store/trainings/trainingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from 'reactstrap';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/all';
import DateToHTML from "../dateToHtml/DateToHtml";

const ViewTrainingCard = ({ training, toggleEditModal }: ViewTrainingProps) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const {
    trainingId,
    trainerId,
    traineeId,
    title,
    description,
    trainingStartDate,
    trainingEndDate,
    techStack,
  } = training;
  const StartDate = DateToHTML(trainingStartDate!);
  const EndDate = DateToHTML(trainingEndDate!);
  const deleteHandler = () => {
    // deleteTraining(trainingId!).then(res => {alert("Deleted training with id:"+ trainingId!); w.location="/"});
    dispatch(deleteTrainingThunk(trainingId!)).then(() =>
      navigate("/Dashboard/Trainings")
    );
  };
  const [toggleValue, setToggleValue] = useState({
    modal: false
  })
  const toggleDeleteTrainingModal = () => {
    setToggleValue({
      modal: !toggleValue.modal
    })
  }

  return (

    // <div className="view-training-container-outer">
    <div className="view-training-container">

      <Modal centered isOpen={toggleValue.modal} toggle={toggleDeleteTrainingModal}>
        <ModalHeader>Delete Training {title}</ModalHeader>
        <ModalBody>
          <ButtonGroup style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="button-group">
              <button className="tag tag-red" onClick={deleteHandler} style={{ width: '70px', height: '70px' }}>
                <div className="flex flex-col" style={{ justifyContent: "center" }}>
                  <div>Yes</div>
                  <div className="flex justify-content-center"><BsHandThumbsUp /></div>
                </div>
              </button>
              <button className="tag tag-teal" onClick={toggleDeleteTrainingModal} style={{ width: '70px', height: '70px' }}>
                <div className="flex flex-col" style={{ justifyContent: "center" }}>
                  <div>No</div>
                  <div className="flex justify-content-center"><BsHandThumbsDown /></div>
                </div>
              </button>
            </div>
          </ButtonGroup>
        </ModalBody>
      </Modal>
      <div className="courses-container">
        <div className="course">
          <div className="course-preview">
            <h6 className="heading-training-card">{title}</h6>
            <hr />
            <h6 className="info">TRAINING-ID :  <span> {trainingId}</span></h6>
            <h6 className="info">START DATE : <span>{StartDate}</span></h6>
            <h6 className="info">END DATE : <span> {EndDate}</span></h6>
          </div>
          <div className="course-info">

            <h6>DESCRIPTION : </h6>
            <span><p>{description}</p></span>
            <h6 >  TECH STACK :   </h6> <span> {techStack}</span>

            <button className="btn-delete" onClick={toggleDeleteTrainingModal} >Delete</button>
            <button className="btn-edit" onClick={() => toggleEditModal()} >Edit</button>


          </div>

        </div>
      </div>
    </div>
    // </div>

  );
};

export default ViewTrainingCard;

// <img classNameName = "button-delete" src={Delete} onClick={toggleDeleteTrainingModal}   alt="fireSpot"/>
//           <img classNameName = "button-edit" src={Edit} onClick={() => toggleEditModal()} alt="fireSpot"/>