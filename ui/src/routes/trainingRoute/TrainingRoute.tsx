import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './TrainingRoute.css'
import AppNavbar from '../../components/team3/header/Header';
import ViewTraining from '../../components/team3/viewTraining/ViewTraining';
import TrainingsDataTable from "../../components/team3/trainingsDataTable/TrainingsDataTable";
// import AddTraining from "./components/addTraining/AddTraining";
// import EditTraining from "./"

function TrainingRoute() {

  return (
    <div>
      <AppNavbar />
      <div className="AppTraining">
        <Routes>
          <Route index element={<TrainingsDataTable />} />
          <Route path="/:id" element={<ViewTraining />} />
          <Route path="/ViewTraining/:id" element={<ViewTraining />} />
        </Routes>
      </div>
    </div>
  )
}

export default TrainingRoute;
