import '../styles/Trainings.css';
import SingleTraining from "./SingleTraining";
import { useContext, useEffect } from "react";
import { ActiveContext } from "../Layout/Root";
import TrainingsDataTable from '../../../team3/trainingsDataTable/TrainingsDataTable';
import AppNavbar from "../../../team3/header/Header";
const Trainings = () => {

    // GET /trainings <- TEAM3
    const trainings = [
        {
            trainerId: 1,
            trainingId: "TR01",
            stack: "MERN",
            startDate: new Date("2022-08-27"),
            endDate: new Date("2022-09-28"),
            traineeCount: 35
        },
        {
            trainerId: 2,
            trainingId: "TR02",
            stack: "MEAN",
            startDate: new Date("2022-08-27"),
            endDate: new Date("2022-09-28"),
            traineeCount: 30
        },
        {
            trainerId: 1,
            trainingId: "TR03",
            stack: "ML",
            startDate: new Date("2022-08-27"),
            endDate: new Date("2022-09-28"),
            traineeCount: 40
        },
        {
            trainerId: 3,
            trainingId: "TR04",
            stack: "Java",
            startDate: new Date("2022-08-27"),
            endDate: new Date("2022-09-28"),
            traineeCount: 20
        }
    ];

    const { setActiveTab } = useContext(ActiveContext);
    useEffect(() => {
        setActiveTab(2);
    });
    return (
        <div className="training-table">
            <AppNavbar />
            <TrainingsDataTable />
            {/* <div className="training-wrapper">
                <div className="header training-container">
                    <div className="trainer-id">Trainer Id</div>
                    <div className="training-id">Training ID</div>
                    <div className="stack">Stack</div>
                    <div className="sdate">Start Date</div>
                    <div className="edate">End Date</div>
                    <div className="count">Trainees</div>
                </div>
                {
                    trainings.map((training, key) => <SingleTraining key={key} training={training} />)
                }
            </div> */}
        </div>
    )
}

export default Trainings;