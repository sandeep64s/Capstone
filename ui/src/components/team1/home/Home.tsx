import { useState, useEffect } from "react";
import "./home.css";
import Dashboard from "../dashboard/Dashboard";
import { EditModal } from "../editModal/EditModal";
import { useLocation } from "react-router";
import { RootState, AppDispatch } from "../../../store";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { Widgets } from "../widgets/Widgets";
import { Routes, Route, useNavigate } from "react-router-dom";
import {resetLogin} from "../../../store/users/userSlice";
import { User } from "../../../types/UserTypes";
import { eraseCookie } from "../utils/cookies";

export const Home = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state as User;
  const [isActive, setActive] = useState(true);
  const dark = "https://iili.io/gBHwoF.jpg";
  const light = "https://iili.io/gBJwe2.jpg";
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  console.log("Edit modal is- ",openEdit)

  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const toggleSrc = () => {
    setActive(!isActive);
  };

  // useEffect(() => {
  //   const item = window.localStorage.getItem("isActive");
  //   const value = item === "true" ? true : false;
  //   setActive(value);
  // }, []);

  useEffect(() => {
    window.localStorage.setItem("isActive", isActive.toString());
    console.log("local storage value should be- ", isActive);
  }, [isActive]);

  return (
    <>
      <div className="home-container">
        <img id="home-bg-img" src={isActive ? dark : light}></img>
        <div id="navbar">
          <div
            className="navbar-icons tooltip"
            id="dashboard-icon"
            onClick={() => navigate("widgets", { replace: true })}
          >
            <span className="tooltiptext">Home</span>
          </div>
          <div
            className="navbar-icons tooltip"
            id="profile-icon"
            onClick={handleClick}
          >
            <span className="tooltiptext">Profile</span>
          </div>
          <div
            className="navbar-icons tooltip"
            id="users-icon"
            onClick={() => navigate("dashboard", { replace: true })}
          >
            <span className="tooltiptext">Users</span>
          </div>
          <div
            className="navbar-icons tooltip"
            id="dark-mode-icon"
            style={{
              backgroundImage: isActive
                ? "url('https://iili.io/gBfj5b.png')"
                : "url('https://iili.io/gBf4dg.png')",
            }}
            onClick={toggleSrc}
          >
            <span className="tooltiptext">{isActive ? "light" : "dark"}</span>
          </div>
          <div
            className="navbar-icons tooltip"
            id="logout-icon"
            onClick={() => {
              console.log(document.cookie);
              dispatch(resetLogin());

              console.log(document.cookie);
                 
               
              navigate("../sign-up", { replace: true });
            }}
          >
            <span className="tooltiptext">Logoff</span>
          </div>
        </div>
        <p className={isActive ? "dark-font" : "light-font"} id="home-heading">
          Hello, Admin!
        </p>
        <Routes>
          <Route path="widgets" element={<Widgets />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
        </Routes>
        <EditModal open={openEdit} handleClose={handleEditClose} />
      </div>
    </>
  );
};
