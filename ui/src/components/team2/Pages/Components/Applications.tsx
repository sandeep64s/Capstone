import React, { useState } from "react";
import Application from "./Application";
import UpdateApplication from "./UpdateApplication";
import { useContext, useEffect } from "react";
import { ActiveContext } from "../Layout/Root";
import { api } from "../../api/api";

interface applicationData {
  _id: string;
  name: string;
  companyName: string;
  dateStart: string;
  dateEnd: string;
  stack: string;
  email: string;
  trainingType: string;
}

function Applications() {
  const { setActiveTab } = useContext(ActiveContext);

  const [curIdx, setCurIdx] = useState(-1);
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const clickHandler = (idx: number) => {
    setCurIdx(idx);
    toggle();
  };

  const [data, setData] = useState<applicationData[]>([]);

  // const data: any[] = [];

  // const data = [
  //   {
  //     name: "Rohan",
  //     companyName: "Google",
  //     dateStart: "Aug 23, 2022",
  //     dateEnd: "Dec 24, 2022",
  //     stack: "MERN",
  //     trainingType: "HALF",
  //   },
  //   {
  //     name: "Karan",
  //     companyName: "Meta",
  //     dateStart: "Aug 23, 2022",
  //     dateEnd: "Dec 24, 2022",
  //     stack: "MERN",
  //     trainingType: "HALF",
  //   },
  //   {
  //     name: "Rohit",
  //     companyName: "Brillio",
  //     dateStart: "Aug 23, 2022",
  //     dateEnd: "Dec 24, 2022",
  //     stack: "MERN",
  //     trainingType: "HALF",
  //   },
  //   {
  //     name: "Aman",
  //     companyName: "Microsoft",
  //     dateStart: "Aug 23, 2022",
  //     dateEnd: "Dec 24, 2022",
  //     stack: "MEAN",
  //     trainingType: "FULL",
  //   },
  // ];

  useEffect(() => {
    setActiveTab(3);
    api("GET", "/applications").then((res: applicationData[]) => {
      setData(res);
    });
  }, []);

  return (
    <React.Fragment>
      <div>
        <h1>Applications Page</h1>
      </div>
      <div className="applications-wrapper">
        {!data.length && <code>No Applications Found</code>}
        {data.length > 0 &&
          data.map((d, key) => (
            <Application
              index={key}
              onClick={clickHandler}
              data={d}
              key={key}
              setData={setData}
            />
          ))}
      </div>
      <UpdateApplication
        setData={setData}
        open={open}
        data={data[curIdx]}
        toggle={toggle}
      />
    </React.Fragment>
  );
}

export default Applications;
