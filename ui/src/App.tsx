import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import { Provider } from "react-redux";
import { store } from "./store";
import AuthRoute from "./routes/authRoute/AuthRoute";
import DasboardRoute from "./routes/dashboardRoute/DasboardRoute";
import TrainingRoute from "./routes/trainingRoute/TrainingRoute";
import TrainerRoute from "./routes/trainerRoute/TrainerRoute"
import TraineesRoute from "./routes/traineesRoute/TraineesRoute";
// import AddTraining from "./components/addTraining/AddTraining";
// import EditTraining from "./"
import 'bootstrap/dist/css/bootstrap.min.css';
import AttendanceRoute from "./routes/attendance/AttendanceRoute";

function App() {

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/Auth" />} />
        <Route path="/Auth/*" element={<AuthRoute />} />
        <Route path="/Dashboard/*" element={<DasboardRoute />} />
        {/* <Route path="/Trainings/*" element={<TrainingRoute />} /> */}
        <Route path="/Trainer/*" element={<TrainerRoute />} />
        <Route path="/Trainee/*" element={<TraineesRoute />} />
        <Route path="/Attendance/*" element={<AttendanceRoute />} />
      </Routes>
    </React.Fragment>
  )
}

export default App
