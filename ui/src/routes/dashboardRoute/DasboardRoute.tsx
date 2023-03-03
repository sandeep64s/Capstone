import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../../components/team2/Pages/Layout/Dashboard";
import Home from '../../components/team2/Pages/Components/Home';
import Applications from '../../components/team2/Pages/Components/Applications';
import Trainings from '../../components/team2/Pages/Components/Trainings';
import List from '../../components/team2/Pages/Components/List';
import Apply from '../../components/team2/Pages/Components/Apply';
import Root from "../../components/team2/Pages/Layout/Root";
import "./DashboardRoute.css";
import ViewTraining from "../../components/team3/viewTraining/ViewTraining";
import HomePage from "../../components/team4/HomePage";

const withLayout = (Component: React.ElementType) => (props: any) => {
    return (
        <Dashboard>
            <Component {...props} />
        </Dashboard>
    );
}

const DashHomePage = withLayout(Home);
const ApplicationsPage = withLayout(Applications);
const TrainingsPage = withLayout(Trainings);
const ApplyPage = withLayout(Apply);
const TrainingPage = withLayout(List);
const ViewTrainingPage = withLayout(ViewTraining);
const ViewTrainersPage = withLayout(HomePage);


const DasboardRoute: React.FC = () => {
    return (
        <Root>
            <Routes>
                <Route path="/" element={<DashHomePage />} />
                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/Trainings" element={<TrainingsPage />} />
                <Route path="/apply" element={<ApplyPage />} />
                <Route path="/Trainings/ViewTraining/:id" element={<ViewTrainingPage />} />
                <Route path="/trainer" element={<ViewTrainersPage />} />
                {/* <Route path="/trainings/:id" element={<TrainingPage />} /> */}
            </Routes>
        </Root>
    );
};


export default DasboardRoute;
