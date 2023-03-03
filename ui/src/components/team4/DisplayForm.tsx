import { useEffect, useState, useRef } from "react";
import {
  deleteTrainers,
  fetchTrainers,
  filterTrainers,
  updateTrainers,
} from "../../store/trainer/trainerSlice";
import { Modal, ModalBody } from "reactstrap";
import { Trainer } from "../../types/Trainer";
import { useAppDispatch, useAppSelector } from "./hooks/Hooks";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import "./TrainerRoute.css";
import { fetchTrainings } from "../../store/trainings/trainingsSlice";
import { TrainingType } from "../../types/types";
import { stringify } from "querystring";
import { staticLocation, uniqueLocation } from "./util";

function DisplayForm() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch = useAppDispatch();
  const Training = useAppSelector((state) => {
    // console.log(state);
    return state.trainings.trainings;
  });
  const [entry, setEntry] = useState<Trainer>({
    _id: "",
    trainerName: "",
    trainerCourse: {
      trainingId: "",
      title: "",
    },
    trainerAvailability: true,
    trainerExperience: "",
    isActive: true,
    trainerEmail: "",
    trainerLocation: "",
    trainerGender: "",
    trainerJoiningDate: "",
  });

  const trainerGender = useRef<HTMLSelectElement>(null);
  const trainerAvailability = useRef<HTMLSelectElement>(null);
  const trainerLocation = useRef<HTMLSelectElement>(null);

  const [myData, trainingSet] = useAppSelector((state) => {
    return [state.trainer.trainers, state.trainings.trainings];
  });

  useEffect(() => {
    dispatch(fetchTrainings());
    // console.log(trainingSet);
  }, []);

  const handleChecked = () => {
    setEntry({ ...entry, trainerAvailability: !entry.trainerAvailability });
  };

  const handleView = (i: number) => {
    // console.log(i);
    setActiveIndex(i);
    setOpen(!open);
  };

  //Hard delete from backend database
  /*  const handleDelete = (id: number) => {
    deleteTrainer(id).then((res) => {
      // myData.filter(data=>data.courseId!==id)
      // setMyData(myData)
      console.log(res);
    });
  }; */

  //filter query
  const handleFilter = () => {
    let query = "";
    if (trainerGender.current?.value) {
      query += `trainerGender=${trainerGender.current?.value}`;
    }
    if (trainerLocation.current?.value) {
      query +=
        (query.length > 0 ? "&" : "") +
        `trainerLocation=${trainerLocation.current?.value}`;
    }
    if (trainerAvailability.current?.value) {
      query +=
        (query.length > 0 ? "&" : "") +
        `trainerAvailability=${trainerAvailability.current?.value}`;
    }
    dispatch(filterTrainers("?" + query));
  };

  useEffect(() => {
    dispatch(fetchTrainers());
  }, []);

  const handleDelete = (thisLi: any, id: any) => {
    thisLi.classList.add("removed");
    setTimeout(() => {
      dispatch(deleteTrainers(id));
      //alert("Deleted Successfully");
      thisLi.classList.remove("removed");
    }, 500);
  };

  const handleEditChange = (e: any) => {
    const { name, value } = e.target;
    setEntry((state: Trainer) => {
      if(name === "trainerCourse") {
        const [id, title] = value.split("-");
        console.log(id, title);
        return {
          ...state,
          [name]: {title: title, trainingId: id } ,
        };
      } else {
        return {
          ...state,
          [name]: value
        };
      }
    });
    console.log(entry);
  };

  const handleEditSubmit = () => {
    console.log("UPPPPPPDATE", entry);
    dispatch(updateTrainers(entry));
    setOpenEdit(false);
  };

  const navigate1 = useNavigate();

  function goToSave() {
    navigate1("/Trainer/addTrainer");
  }

  function goToHome() {
    navigate1("/dashboard");
  }

  function goToAttendance() {
    navigate1("/Attendance");
  }

  return (
    <div style={{ overflowY: "auto", width: "100%" }}>
      {/* <h1 className="view-head"> List of Trainers</h1>{" "} */}
      <button className="linkToHome" onClick={goToHome}>
        Home
      </button>
      <button className="linkToAdd" onClick={goToSave}>
        Add Trainer
      </button>
      <button className="linkToAdd" onClick={goToAttendance}>
        Attendance
      </button>
      <button
        className="linkToHome"
        onClick={() => {
          setOpenFilter(true);
        }}
      >
        Filter List
      </button>
      <ul className="heading">
        <li className="heading-content">Trainer Name</li>
        <li className="heading-content">Training Name</li>
        <li className="heading-content">Location</li>
      </ul>
      <ol className="ul">
        {myData.length &&
          myData.map((trainer: Trainer, i: number) => (
            <li className="viewLi" key={i}>
              <h6 className="outerh6">
                <div className="innerh6-one">
                  {/* <h6 className="in">NAME:</h6>{" "} */}
                  <div className="view-content">{trainer.trainerName}</div>
                </div>
                <div className="innerh6-two">
                  {/* <h6 className="in">COURSE:</h6> */}
                  <div className="view-content">
                    {trainer.trainerCourse.title}
                  </div>
                </div>
                <div className="innerh6-three">
                  {/* <h6 className="in">LOCATION:</h6>{" "} */}
                  <div className="view-content">{trainer.trainerLocation}</div>
                </div>
                <button className="view-btn" onClick={() => handleView(i)}>
                  View
                </button>{" "}
                <button
                  className="view-btn"
                  onClick={() => {
                    setEntry(myData[i]);
                    setOpenEdit(true);
                  }}
                >
                  Update
                </button>{" "}
                <button
                  className="view-btn"
                  onClick={() => {
                    const thisLi = document.getElementsByTagName("li")[i];
                    handleDelete(thisLi, trainer._id);
                  }}
                >
                  Delete
                </button>{" "}
              </h6>
            </li>
          ))}
      </ol>
      <div>
        <Modal isOpen={open} toggle={() => setOpen(!open)}>
          {myData.length && (
            <ModalBody className="test">
              <div className="modal1">
                {/* {alert(JSON.stringify(myData))} */}
                <>
                  Trainer Name:{" "}
                  {myData.length > 0 && myData[activeIndex].trainerName}
                </>
                {/* <>Trainer Name: {myData.length > 0 && myData[activeIndex]}</> */}
              </div>
              <div className="modal2">
                <>
                  Trainer Course:{" "}
                  {myData.length > 0 && myData[activeIndex].trainerCourse.title}
                </>
              </div>
              <div className="modal3">
                <>
                  Trainer Availability:{" "}
                  {myData.length > 0 && myData[activeIndex].trainerAvailability
                    ? "Yes"
                    : "No"}
                </>
              </div>
              <div className="modal4">
                <>
                  Trainer Location:{" "}
                  {myData.length > 0 && myData[activeIndex].trainerLocation}
                </>
              </div>
              <div className="modal5">
                <>
                  Trainer Gender: {myData && myData[activeIndex].trainerGender}
                </>
              </div>
              <div className="modal6">
                <>Trainer Email: {myData && myData[activeIndex].trainerEmail}</>
              </div>
              <div className="modal7">
                <>
                  Trainer Joining Date:{" "}
                  {myData && myData[activeIndex].trainerJoiningDate}
                </>
              </div>
              <div className="modal8">
                <>
                  Trainer Experience:{" "}
                  {myData && myData[activeIndex].trainerExperience}
                </>
              </div>
            </ModalBody>
          )}
        </Modal>

        <Modal isOpen={openEdit} toggle={() => setOpenEdit(!openEdit)}>
          {myData.length && (
            <ModalBody>
              <form className="update-form">
                <div className="update1">
                  <label className="updateLabel">Trainer Name:-</label>{" "}
                  <input
                    className="input-update"
                    name="trainerName"
                    onChange={handleEditChange}
                    value={entry.trainerName}
                  ></input>
                </div>
                <div className="update2">
                  <label className="updateLabel">Tech Stack:-</label>{" "}
                  <select className="gender-box" name="trainerCourse" onChange={handleEditChange} defaultValue={`${entry.trainerCourse.title}-${entry.trainerCourse.trainingId}`}>
                    <option value="">--Select--</option>
                    {Training.map((training: TrainingType) => (
                      <option
                        key={training.trainingId}
                        value={`${training.trainingId}-${training.title}`}
                      >
                        {training.trainingId}-{training.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="update3">
                  <label className="updateLabel">Trainer Email:-</label>{" "}
                  <input
                    className="input-update"
                    name="trainerEmail"
                    onChange={handleEditChange}
                    value={entry.trainerEmail}
                  ></input>
                </div>
                <div className="update4">
                  <label className="updateLabel">Trainer Location:-</label>{" "}
                  <select
                    className="gender-box"
                    name="trainerLocation"
                    onChange={handleEditChange}
                    defaultValue={entry.trainerLocation}
                  >
                    <option value="">--Select--</option>
                    {uniqueLocation.map((location, key) => (
                      <option key={key} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="update5">
                  <label className="updateLabel">Trainer Experience:-</label>
                  <input
                    className="input-update"
                    name="trainerExperience"
                    onChange={handleEditChange}
                    value={entry.trainerExperience}
                  ></input>
                </div>

                <div className="update6">
                  <label className="switch-wrapper">
                    Available to Train:-
                    <Switch
                      className="switch"
                      onChange={() => handleChecked()}
                      checked={entry.trainerAvailability}
                    />
                  </label>
                </div>

                <br />
                <button
                  className="updateSubmit"
                  type="button"
                  onClick={() => {
                    handleEditSubmit();
                    dispatch(fetchTrainers());
                  }}
                >
                  Submit
                </button>
              </form>
            </ModalBody>
          )}
        </Modal>
      </div>

      <Modal isOpen={openFilter} toggle={() => setOpenFilter(!openFilter)}>
        <ModalBody>
          <form className="update-form">
            <div className="update1">
              <label className="updateLabel">Trainer Availability:-</label>{" "}
              <select
                ref={trainerAvailability}
                className="gender-box"
                name="trainerAvailabilty"
              >
                <option value="">--Select--</option>
                <option value={"true"}>Yes</option>
                <option value={"false"}>No</option>
              </select>
              <label className="updateLabel">Trainer Location:-</label>{" "}
              <select
                ref={trainerLocation}
                className="gender-box"
                name="trainerLocation"
              >
                <option value="">--Select--</option>
                {uniqueLocation.map((location, key) => (
                  <option key={key} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <label className="updateLabel">Trainer Gender:-</label>{" "}
              <select
                ref={trainerGender}
                className="gender-box"
                name="trainerGender"
              >
                <option value="">--Select--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Others</option>
              </select>
            </div>
            <br />
            <button
              className="updateSubmit"
              type="button"
              onClick={() => {
                handleFilter();
                setOpenFilter(!openFilter);
                // setActiveIndex(-1);
              }}
            >
              Confirm
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DisplayForm;
