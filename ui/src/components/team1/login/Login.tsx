import "./login.css";
import { useEffect } from "react";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../../store";
import { useState } from "react";
import { loginUser } from "../../../store/users/userSlice";
import { loginType } from "../../../types/UserTypes";

export const Login = () => {
  const navigate = useNavigate();
  const [alertStatus, setAlertStatus] = useState(false);
  const [login, setlogin] = useState<loginType>({ username: "", password: "" });
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const useAppDispatch: () => AppDispatch = useDispatch;
  const isValid = useAppSelector((state) => state.user.loginResponse);
  const dispatch = useAppDispatch();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setlogin((state) => {
      return { ...state, [name]: value };
    });
  };
  const handleSubmit = (e : any) => {
    e.preventDefault();
    if(login.username.length===0 || login.password.length===0){
      setAlertStatus(true);
      setTimeout(() => {
        setAlertStatus(false);
      }, 3000);
    }
    else{
    dispatch(loginUser(login))
    }
  };
  useEffect(() => {
    if (isValid.userValidated === true && isValid.userDeleted === false && isValid.passwordValidated === true) { navigate("home", { state: login, replace: true }); console.log("should navigate to home") }
    else if (login.username && (isValid.userValidated === false || isValid.passwordValidated === false)) {
      // setAlertStatus(true);
      // setTimeout(() => {
      //   setAlertStatus(false);
      // }, 3000);
    }
    console.log("login- ", login.username);
  }, [isValid.passwordValidated, isValid.userValidated, isValid]);

  return (
    <>

      <div className="login-container">
        <h1 id="login-header">Login here!</h1>
        <form onSubmit={handleSubmit}>
          <img
            className="login-icon"
            src="https://cdn-icons-png.flaticon.com/512/7542/7542303.png"
          ></img>
          <input
            name="username"
            className="login-input"
            placeholder="username"
            onChange={handleChange}
            required
          ></input>
          <br />
          <img
            className="login-icon"
            src="https://cdn-icons-png.flaticon.com/512/1000/1000966.png"
          ></img>
          <input
            name="password"
            className="login-input"
            placeholder="password"
            type="password"
            required
            onChange={handleChange}
          ></input>
          <br />
          <button type="submit" id="login-btn">
            Login
          </button>
        </form>
        <p id="login-footer">
          Don't have an account? Create your account{" "}
          <span
            onClick={() => navigate("sign-up", { replace: true })}
            id="signup-link"
          >
            here!
          </span>
        </p>
        {alertStatus && <div className="alert-box">
          <p>Invalid username or password!</p>
        </div>}
      </div>
    </>
  );
};
