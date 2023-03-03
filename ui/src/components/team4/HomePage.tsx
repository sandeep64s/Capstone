import { BsPeopleFill, BsPersonPlusFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./TrainerRoute.css";

function Home() {
  const navigate = useNavigate();
  function goToSave() {
    navigate("/Trainer/addTrainer");
  }

  function goToView() {
    navigate("/Trainer/viewTrainer");
  }

  return (
    <div className="home">
      <div className="home-left">
        <button className="HomeButton" type="submit" onClick={goToSave}>
          Add Trainer
          <div className="home-logo"><BsPersonPlusFill /></div>
        </button>
      </div>

      <div className="home-right">
        <button className="HomeButton" type="submit" onClick={goToView}>
          View Trainer
          <div className="home-logo"><BsPeopleFill /></div>
        </button>
      </div>
    </div>
  );
}

export default Home;
