import { useState } from "react";
import SignUp from "./SignUp";
import Cookies from "js-cookie";

const Header = () => {
  const existingToken = Cookies.get("token");
  const [isModalOpen, setModalOpen] = useState(!existingToken);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogout = async () => {
    await Cookies.remove("token");
    await Cookies.remove("em");
  };
  return (
    <div className="">
      <div className="px-4 py-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="/"
              aria-label="Company"
              title="Company"
              className="inline-flex items-center mr-8"
            >
              <h1
                className="text-[30px] font-[700] uppercase mb-[15px] text-white"
                style={{
                  textShadow: "0px 0px 4px #ffffff",
                  letterSpacing: "1px",
                }}
              >
                AutoBongs
              </h1>
            </a>
          </div>
          <ul className="flex items-center space-x-8 lg:flex">
            {/* <li>
              <button
                onClick={openModal}
                className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-blue-100"
              >
                Sign in
              </button>
              <SignIn isOpen={isModalOpen} onClose={closeModal} />
            </li> */}
            {existingToken ? (
              <li>
                <a
                  href="/"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-400/90 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                >
                  Sign out
                </a>
              </li>
            ) : (
              <li>
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-400/90 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                >
                  Sign up
                </button>
                <SignUp isOpen={isModalOpen} onClose={closeModal} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
