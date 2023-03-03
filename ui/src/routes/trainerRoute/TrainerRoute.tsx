// import "./TrainerRoute.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddForm from "../../components/team4/AddForm";
import DisplayForm from "../../components/team4/DisplayForm";
import HomePage from "../../components/team4/HomePage";

function Home() {
  return (
    <div className="TrainerApp">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addTrainer" element={<AddForm />} />
        <Route path="/viewTrainer" element={<DisplayForm />} />
      </Routes>
    </div>
  );
}

export default Home;
