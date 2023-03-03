import Addmodal from "../AddForm/AddModal";
import Modal from "../Form/Modal";
export default function Navbar() {
  return (
    <nav className="bg-orange-500 border-gray-200 px-2 sm:px-4 py-2.5 ">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <span className="text-xl font-semibold whitespace-nowrap text-white">
          Dashboard
        </span>
        <div className=" ml-auto">
          <Modal />
          <Addmodal />
        </div>
        <div className="flex items-center md:order-2">
          <button
            type="button"
            className="flex mr-3 text-sm bg-orange-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            {/* <span className="sr-only">Open user menu</span> */}
            <img
              className="w-8 h-8 rounded-full"
              src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
              alt="user photo"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
