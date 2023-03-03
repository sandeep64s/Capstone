import React from "react";
import "./AuthRoute.css";
import { Login } from "../../components/team1/login/Login";
import { SignUp } from "../../components/team1/signUp/SignUp";
import { NoMatch } from "../../components/team1/noMatch/NoMatch";
import { Home } from "../../components/team1/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "../../components/team1/route-guard/PrivateRoute";

function AuthRoute() {

  return (
    <div>
      <div className="AuthApp">
        <img
          id="bg-img"
          src="https://images.unsplash.com/photo-1585241645927-c7a8e5840c42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        ></img>
        <div id="name-container">
          <h1 id="team-name">
            Team <b>Bombae</b>
          </h1>
          <p id="team-members">
            Admin module made by-
            <br />
            Ishvendra, Jitendra, Shreyas & Shrey
          </p>
          <hr id="main-hr" />
        </div>
        
          <Routes>
            <Route path="*" element={<NoMatch />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="sign-up" element={<SignUp />}></Route>
            <Route path='home/*' element={<PrivateRoute role={window.localStorage.getItem("role") || ""} outlet={<Home />}/>}></Route>
          </Routes>
        {/* <Routes>
          <Route path='*' element={<NoMatch />}></Route>
          <Route path='/' element={<Login />}></Route>
          <Route path='sign-up' element={<SignUp />}></Route>
          
        </Routes> */}
      </div>
    </div>
  );
}

export default AuthRoute;
