import { useState } from "react";
import video from "./assets/video.mp4";
import "./App.css";
// import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Cookies from "js-cookie";

function App() {
  const contactEmail = "info@autobong.com";
  const existingToken = Cookies.get("token");
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <video autoPlay muted loop src={video} id="myVideo">
        {/* <source  type="video/mp4" /> */}
        Your browser does not support HTML5 video.
      </video>
      <div
        className="text-white relative content"
        // style={{
        //   backgroundImage: `url(${bgImg})`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      >
        <div className="absolute top-0 w-full">{/* <Header /> */}</div>
        <div className="max-w-full w-full h-screen flex flex-col justify-center items-center text-white px-12 sm:px-[0px]">
          <h1
            className="text-[60px] sm:text-[90px] font-[700] uppercase mb-[15px] headline-text"
            style={{ textShadow: "5px 3px 5px #000000", letterSpacing: "20px" }}
          >
            AutoBongs
          </h1>
          <p
            className="text-[18px] sm:text-[25px] font-[700] max-w-[650px] text-center font-sans"
            style={{ textShadow: "5px 3px 5px #000000", letterSpacing: "1px" }}
          >
            Autobongs is an innovative and optimized ecommerce platform for
            devices and accessories used in the enjoyment of cannabis, nicotine,
            and functional mushrooms.
          </p>
          {existingToken ? (
            <button className="my-[40px] text-[18px] sm:text-[24px] font-[500] px-8 py-4 sm:px-[50px] sm:py-[18px] rounded-full border-2 border-white hover:underline">
              <a href={`mailto:${contactEmail}`}>Contact Us</a>
            </button>
          ) : (
            <button
              onClick={openModal}
              className="my-[40px] inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide text-white rounded-full shadow-md bg-[#5024CE] hover:bg-[#B69DFE] focus:shadow-outline focus:outline-none hover:transition hover:duration-150 hover:ease-in-out transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300"
            >
              Beta Signup
            </button>
          )}
          <SignUp isOpen={isModalOpen} onClose={closeModal} />

          <span className="text-center absolute bottom-6">
            All Right Reserved - © Copyright Autobongs 2023
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
