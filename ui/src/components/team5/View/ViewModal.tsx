import { useState } from "react";
import { Trainee } from "../../../types";
import EditModal from "./EditModal";

export default function ViewModal(props: Trainee) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className=" text-green-500 font-bold uppercase text-sm px-6 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        onClick={() => setShowModal(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path
            fillRule="evenodd"
            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-scroll overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto min-w-max bg-orange-50 rounded">
              {/*content*/}
              <div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-orange-50 outline-none focus:outline-none">
                {/*header*/}
                <div>
                  <button
                    className="p-1 ml-auto border-0 text-white opacity-80 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" text-black h-6 w-6 text-xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>

                {/*body*/}
                <div className="card p-6 max-w-m bg-orange-50 rounded-lg border border-gray-200 shadow-md">
                  <h1 className="card-title text-orange-500 text-xl">
                    <img
                      className="w-12 h-12 mr-4 ml-4 object-cover"
                      src={
                        props
                          ? props.profilePic
                            ? `${
                                import.meta.env.VITE_SERVERURL
                              }/static/profilePic/` + props.profilePic.filename
                            : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                          : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                      }
                      alt="Avatar Upload"
                    />
                    {props.traineeId}
                  </h1>
                  <div className="justify text-m text-left">
                    {Object.entries(props).map(([key, val]) => (
                      <p key={key}>
                        {key === "training" ? (
                          <>
                            <b>{key}:</b> {val?.name?.toString()}
                          </>
                        ) : key === "profilePic" ? null : key === "resume" ? (
                          <>
                            <b>{key}:</b> {val?.filename?.toString()}
                          </>
                        ) : val && val != null ? (
                          <>
                            <b>{key}:</b> {val.toString()}
                          </>
                        ) : null}
                      </p>
                    ))}
                  </div>
                  <div className="card-action btn border-0">
                    <EditModal {...props} />
                  </div>
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
