import { getDateFormat } from "../../helpers/getDateFormat";
import "../styles/Application.css";

import { RiDeleteBin5Line } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { api } from "../../api/api";

interface dataProp {
  data: applicationData;
  index: number;
  setData: (data: applicationData[]) => void;
  onClick: (idx: number) => void;
}

interface applicationData {
  _id: string;
  name: string;
  companyName: string;
  dateStart: string;
  dateEnd: string;
  stack: string;
  trainingType: string;
  email: string;
}

function Application({ data, index, setData, onClick }: dataProp) {
  const { name, companyName, dateStart, dateEnd, stack, trainingType, email } =
    data;

  const handleDelete = (e?: React.MouseEvent<HTMLButtonElement>) => {
    api("DELETE", `/applications/${data._id}`).then((res) => setData(res.data));
  };

  return (
    <div className="card-wrapper">
      <button className="card-options" onClick={handleDelete}>
        <BiDotsVerticalRounded className="options-icon" />
        <RiDeleteBin5Line className="delete-icon" />
      </button>
      <div onClick={() => onClick(index)} className="card">
        <div className="infos">
          <div className="name">
            <h2>{name}</h2>
            <h4>@{companyName}</h4>
          </div>
          <span>
            <b>{email}</b>
          </span>
          <ul className="card-stats">
            <li>
              <h3>Start Date</h3>
              <h4>{getDateFormat(dateStart)}</h4>
            </li>
            <li>
              <h3>End Date</h3>
              <h4>{getDateFormat(dateEnd)} </h4>
            </li>
          </ul>
          <div className="links">
            <button className="follow">{stack}</button>
            <button className="view">{trainingType}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Application;
