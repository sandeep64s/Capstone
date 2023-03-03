import { useEffect, useState } from "react";
// import Training from "../training/Training";
import { useParams } from "react-router-dom";
import React from "react";
import { getTraining } from "../server";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import EditTraining from "../editTraining/EditTraining";
import { TrainingType } from "../../../types/types";
import { useDispatch, useSelector } from 'react-redux';
import { selectTraining, fetchTraining, clearTrainingFound } from '../../../store/trainings/trainingsSlice'
import { DotLoader, PacmanLoader } from "react-spinners";
// import ViewTraining_Table from "../viewTraining_table/viewTraining_table";
import { useAppDispatch } from "../../../store";
import ViewTrainingCard from "../viewTrainingCard/viewTrainingCard";
import AppNavbar from "../header/Header";
const ViewTraining = () => {
  console.log('viewTraining');

  const training: TrainingType = useSelector(selectTraining);
  console.log('training');
  console.log(training);

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const clearHandler = () => {
    dispatch(clearTrainingFound({}));
  }
  useEffect(() => {
    clearHandler();
    setTimeout(() => { dispatch(fetchTraining(id!)); }, 500);
  }, []);

  const [toggleValue, setToggleValue] = useState({
    modal: false
  })
  const toggleEditTrainingModal = () => {
    setToggleValue({ modal: !toggleValue.modal })
  }
  if (training === undefined) {
    return (<div>No data</div>)
  }
  else if (Object.keys(training).length == 0) {
    return (
      <div style={{ height: '100vh', width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <PacmanLoader color="#FFFFFF" />
      </div>)
  }
  return (
    <>
      {/* <Table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>TrainingID</th>
            <th>TrainerID</th>
            <th>Trainees</th>
            <th>Title</th>
            <th>Description</th>
            <th>TrainingStartDate</th>
            <th>TrainingEndDate</th>
            <th>TechStack</th>
          </tr>
        </thead>
        <tbody> */}
      {/* <ViewTraining_Table training = {training} details={true} key={training.trainingId} editModalHandler={toggleEditTrainingModal}/> */}
      <AppNavbar />
      <ViewTrainingCard training={training} toggleEditModal={toggleEditTrainingModal} />
      {/* </tbody> */}
      {/* </Table> */}
      <Modal isOpen={toggleValue.modal} toggle={toggleEditTrainingModal}>
        <ModalHeader>Edit Training Form</ModalHeader>
        <ModalBody><EditTraining toggleEditModal={toggleEditTrainingModal} trainingData={training} /></ModalBody>
      </Modal>
    </>
  );
};

export default ViewTraining;