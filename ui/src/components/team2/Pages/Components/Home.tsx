import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ActiveContext } from "../Layout/Root";

function Home() {
    const { setActiveTab } = useContext(ActiveContext);
    useEffect(() => {
        setActiveTab(1);
    });
    return (
        <div>
            <h1>Home Page</h1>
            <nav className="home-links">
                <Link to="/Dashboard">Home</Link>
                <br />
                <Link to="/Dashboard/apply">Apply Trainer</Link>
                <br />
                <Link to="/Dashboard/Trainings">Trainings</Link>
                <br />
                <Link to="/trainer">Trainers Dashboard</Link>
                <br />
                <Link to="/Dashboard/applications">Applications</Link>
                <br />
                <Link to="/Dashboard/trainings/ViewTraining/1001">Single Training</Link>
                <br />
                <Link to="/trainee">Trainee</Link>
            </nav>
        </div>
    );
}

export default Home;