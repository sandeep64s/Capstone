import { useState } from "react";
import TraineeForm from "../Form/TraineeForm";
import { Trainee } from "../types";

export default function EditModal(props: Trainee) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="btn btn-warning" onClick={() => setShowModal(true)}>
        Edit
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto min-w-max">
              {/*content*/}
              <div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="bg-orange-500 flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl text-white hover:text-orange-50 font-bold transition duration-300 p-4">
                    UPDATE TRAINEE
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-white opacity-80 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {/*body*/}
                <div className="relative px-6 pt-4 pb-2 flex-auto">
                  <TraineeForm {...props} />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
