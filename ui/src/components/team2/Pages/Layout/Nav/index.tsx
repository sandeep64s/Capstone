import React, { useContext } from "react";
import { BsCollectionFill } from "react-icons/bs";
import { MdCastForEducation, MdOutlinePersonPin } from "react-icons/md";
import { IoLogoAppleAr } from "react-icons/io5";
import { BsPersonLinesFill } from "react-icons/bs";
import { TbSmartHome } from "react-icons/tb";

import { ActiveContext } from "../Root";
import IconTab from "./IconTab";
import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  const { activeTab } = useContext(ActiveContext);

  return (
    <nav>
      <div className="logo">
        <Link to="/Dashboard">
          <IoLogoAppleAr />
        </Link>
      </div>
      <ul>
        <Link to="/Dashboard">
          <IconTab text="Home" active={activeTab === 1}>
            <TbSmartHome />
          </IconTab>
        </Link>
        <Link to="/Dashboard/Trainings">
          <IconTab text="Trainings" active={activeTab === 2}>
            <MdCastForEducation />
          </IconTab>
        </Link>
        <Link to="/Dashboard/applications">
          <IconTab text="Applications" active={activeTab === 3}>
            <BsCollectionFill />
          </IconTab>
        </Link>
        <Link to="/Dashboard/apply">
          <IconTab text="Apply" active={activeTab === 4}>
            <MdOutlinePersonPin />
          </IconTab>
        </Link>
        <Link to="/Dashboard/trainer">
          <IconTab text="Trainers" active={activeTab === 5}>
            <BsPersonLinesFill />
          </IconTab>
        </Link>
      </ul >
    </nav >
  );
};

export default Nav;
