import { useState } from "react";
import TraineeForm from "./TraineeForm";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="bg-orange-500 text-white active:bg-orange-600 hover:bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Update
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto min-w-max">

              {/*content*/}
              <div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                {/*header*/}
                <div className="bg-orange-500 flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl text-white hover:text-orange-50 font-bold transition duration-300 pt-3 px-2 pb-2">
                    UPDATE TRAINEE
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-white opacity-80 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-white hover:bg-orange-500 hover:border-none border-none h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {/*body*/}
                <div className="relative px-6 pt-4 pb-2 flex-auto">
                  <TraineeForm />
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
