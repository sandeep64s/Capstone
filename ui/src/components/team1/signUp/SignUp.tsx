import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {addUser} from "../../../store/users/userSlice"
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import {useEffect} from "react";
import { checkPassType, entryType } from "../../../types/UserTypes";

export const SignUp = () => {

  const [alertPwd, setAlertPwd] = useState(false);
  const [alertEmail, setAlertEmail] = useState(false);
  const [alertUsername, setAlertUsername] = useState(false);
  const [alertVerify, setalertVerify] = useState<boolean>(false);
  
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const isValidSignup = useAppSelector((state) => state.user.signupResponse);
  const [entry, setEntry] = useState<entryType>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    dob: "",
    password: "",
    isActive: true,
    token: "",
  });
  const [passwordCheck, setPasswordCheck] = useState<checkPassType>({cpass : '', same : true});
  const handleChange = (e : any)=>{
    const {name, value} = e.target
    setEntry((state : entryType)=>{
        return{
            ...state, [name] : value
        }
    })
  }

  const handlePassCheck = (e : any)=>{
      const {name, value} = e.target
      setPasswordCheck((state)=>{
        if(value!==entry.password){
          return{
            cpass:value,
            same : false
          }
        }
          else{
            return{
              cpass:value,
            same : true
            }
          }
        
      })      
  }

  const handleSubmit = (e : any)=>{
    e.preventDefault();
    console.log(entry);
    console.log(passwordCheck);
      if(passwordCheck.same===false){
        console.log("enter same passwords");
        setPasswordCheck({cpass:'', same:false})
        setAlertPwd(true);
        setTimeout(()=>{
          setAlertPwd(false);
        },3000);
      }
      else{
          dispatch(addUser(entry));
      }
  }

  useEffect(() => {
    if(isValidSignup.message === "Please verify your email"){
      setalertVerify(true);
      setTimeout(()=>{
        setalertVerify(false);
      },3000);
    }
    // else if(isValidSignup.userAllowed===false && isValidSignup.emailAllowed===false){ alertBoxEmail(); alertBoxUsername()}
  }, [isValidSignup.validity]);

  const navigate = useNavigate();

  const alertBoxEmail = () => {
    setAlertEmail(true);
    setTimeout(()=>{
      setAlertEmail(false);
    },3000);
    console.log("Invalid email alert should come")
  }

  const alertBoxUsername = () => {
    setAlertUsername(true);
    setTimeout(()=>{
      setAlertUsername(false);
    },3000);
    console.log("Invalid user alert should come")
  }

  return (
    <>
      <div className="signup-container">
        <h1 id="signup-header">Sign Up!</h1>
        <form onSubmit={handleSubmit}>
        <input className="signup-input" name="first_name" pattern="^[A-Za-z]+$" placeholder="first name" minLength={3} maxLength={16} required={true} onChange={handleChange}></input>
        {/* <br /> */}
        <input className="signup-input" name="last_name" pattern="^[A-Za-z]+$" placeholder="last name" minLength={3} maxLength={16} onChange={handleChange}></input>
        <br />
        <input className="signup-input2" name="username" placeholder="username" minLength={5} maxLength={16} required={true} onChange={handleChange}></input>
        <br />
        <input className="signup-input2" name="email" type="email" required={true} pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" placeholder="email id" onChange={handleChange}></input>
        <br />
        <input className="signup-input2" name="password" type="password" required={true} placeholder="password"  minLength={5} maxLength={16} onChange={handleChange}></input>
        <br />
        <input style={passwordCheck.same===false ? {borderColor : 'red' } : {borderColor : 'black'}} className="signup-input2" name="cpass" type="password" placeholder="confirm password" required={true} minLength={5} maxLength={16}   onChange={handlePassCheck}></input>
        <br />
        <button id="signup-btn" type="submit">Sign Up</button>
        </form>
        <p id="signup-footer">
          Already have an account? Login{" "}
          <span
            onClick={() => navigate("../", { replace: true })}
            id="login-link"
          >
            here!
          </span>
        </p>
        {alertVerify && <div className="alert-box">
          <p>Verify your email</p>
        </div>}
        {alertPwd && <div className="alert-box">
          <p>Confirmed Password did not match</p>
        </div>}
        {alertEmail && <div className="alert-box">
          <p>Email id not available</p>
        </div>}
        {alertUsername && <div className="alert-box">
          <p>Username not available</p>
        </div>}
      </div>
    </>
  );
};
