import "./EditModal.css";
import Modal from "react-modal";
import { RootState, AppDispatch } from "../../../store";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { useState } from "react";
import { editProfile } from "../../../store/users/userSlice";
import { checkPassType, User } from "../../../types/UserTypes";
import { getCookie } from "../utils/cookies";

const customStyles = {
  content: {
    top: "50%",
    height: "480px",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
    background: "#4C4C4C",
    color: "white",
    boxShadow: "0 0px 8px 0 rgb(0, 0, 0), 0 0px 25px 0 rgb(0, 0, 0)",
    border: "none",
    width: "500px",
    overflow: 'none'
  },
};

export const EditModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  console.log(document.cookie);
  
  const [currentUserEntry, setcurrentUserEntry] = useState<User>(JSON.parse(getCookie("user")));
  const [showCPass, setshowCPass] = useState<boolean>(false);
  const [passCheck, setpassCheck] = useState<checkPassType>({
    cpass: "",
    same: false,
  });

  const parseDob = function(){
    var dob = currentUserEntry.dob;
    var newYear = dob.slice(6,10);
    var newMonth = dob.slice(3,5);
    var newDay = dob.slice(0,2);
    var parsedDob = newYear + '-' + newMonth + '-' + newDay;

    return parsedDob;
  }
  

  const dateValidationMin = function(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear() - 100;

    var minDate = yyyy + '-' + mm + '-' + dd;
    return minDate;
  }

  const dateValidationMax = function(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear() - 18;

    var maxDate = yyyy + '-' + mm + '-' + dd;
    return maxDate;
  }

  const handleChange = (e : any)=>{
    const {name, value} = e.target
    setcurrentUserEntry((state : User)=>{
        return{
            ...state, [name] : value
        }
    })
    if(name==="password"){
        setshowCPass(true)
    }
  }
  console.log("Current user entry- ",currentUserEntry);
  
  const handlePassCheck = (e: any) => {
    const { name, value } = e.target;
    setpassCheck((state) => {
      if (value !== currentUserEntry.password) {
        return {
          cpass: value,
          same: false,
        };
      } else {
        return {
          cpass: value,
          same: true,
        };
      }
    });
    console.log(passCheck);
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    console.log(currentUserEntry);
    console.log(passCheck);
    if (currentUserEntry.password!= JSON.parse(getCookie("user")).password && passCheck.same === false) {
      console.log("enter same passwords");
      alert("enter same passwords");
      setpassCheck({ cpass: "", same: false });
    } else {        
      dispatch(editProfile(currentUserEntry));
      alert("Details updated successfully!");
      handleClose()
    }
  };
  return (
    <>
      
      <Modal isOpen={open} style={customStyles} contentLabel="Edit Modal" ariaHideApp={false}>
      <h2 style={{ marginLeft: "50px", marginTop: "20px",marginBottom: "20px", fontSize: "1.5em", fontWeight: "bold" }}>Edit your profile</h2>
      <hr />
      <form>
        <span className="modal-headers">First name: </span>
        <input
          name="first_name"
          onChange={handleChange}
          value={currentUserEntry.first_name}
        />
        <br />
        <span className="modal-headers">Last name: </span>
        <input
          name="last_name"
          onChange={handleChange}
          value={currentUserEntry.last_name}
        />
        <br />
        <span className="modal-headers">Email: </span>
        <input name="email" onChange={handleChange} value={currentUserEntry.email} />
        <br />
        <span className="modal-headers">DOB: </span>
        <input
          type="date"
          max={dateValidationMax()}
          min={dateValidationMin()}
          // max='2022-08-30'
          name="dob"
          onChange={handleChange}
          value={currentUserEntry.dob}
        />
        <br />
        <span className="modal-headers">Password: </span>
        <input
          type="password"
          name="password"
          minLength={5}
          maxLength={16}
          onChange={handleChange}
          required={true}
          value={currentUserEntry.password}
        />
        <br />
        {showCPass ? <div>
        <span className="modal-headers">Check Pass: </span>
        <input
          style={
            passCheck.same === false
              ? { borderColor: "red" }
              : { borderColor: "black" }
          }
          name="cpass"
          type="password"
          minLength={5}
          maxLength={16}
          placeholder="confirm password"
          onChange={handlePassCheck}
        ></input> </div> : <div><br></br> <br></br></div> }
        <br />{" "}
        <hr />
        <button type="submit" id="edit-modal-save-btn" className="edit-modal-btn-common" onClick={handleSubmit}>
          Save
        </button>
      </form>
      <button
        id="edit-modal-close-btn"
        className="edit-modal-btn-common"
        onClick={handleClose}
      >
        Close
      </button>
    </Modal>
    </>
    
  );
};
