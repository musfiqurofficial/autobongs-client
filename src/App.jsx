import { useEffect, useRef, useState } from "react";
import video from "./assets/video.mp4";
import "./App.css";
// import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Cookies from "js-cookie";

function App() {
  const contactEmail = "info@autobong.com";
  const existingToken = Cookies.get("token");
  const [isModalOpen, setModalOpen] = useState(false);

  // Use a ref to access and control the video element
  const videoRef = useRef(null);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    // Attempt to play the video after it's loaded
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    };

    // Check for user interaction before playing on iOS
    playVideo();
  }, []);

  return (
    <>
      <video
        ref={videoRef} // Attach ref to the video element
        autoPlay
        muted
        loop
        playsInline // Indicate video should play inline on mobile
        src={video}
        id="myVideo"
      >
        {/* <source type="video/mp4" /> */}
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
        <div className="max-w-full w-full h-screen flex flex-col justify-end items-center text-white px-4">
          <h1
            className="text-[50px] sm:text-[110px] font-[900] uppercase m-0 headline-text tracking-[10px] sm:tracking-[20px]"
            style={{ textShadow: "5px 3px 5px #000000" }}
          >
            AutoBongs
          </h1>
          <p
            className="text-[18px] sm:text-[25px] font-[700] max-w-[650px] text-center mb-[50px] mt-[0px]"
            style={{ textShadow: "5px 3px 5px #000000", letterSpacing: "1px" }}
          >
            Autobongs is an innovative and optimized ecommerce platform for
            devices and accessories used in the enjoyment of cannabis, nicotine,
            and functional mushrooms.
          </p>
          {existingToken ? (
            <button className="text-[18px] sm:text-[24px] font-[500] px-8 py-4 sm:px-[50px] sm:py-[18px] rounded-full border-2 border-white underline">
              <a href={`mailto:${contactEmail}`}>Contact Us</a>
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              {" "}
              <button
                onClick={openModal}
                className="text-[18px] font-[500] px-8 h-[80px] sm:px-[50px] sm:py-[18px] border-2 border-[#5024CE] tracking-wide text-white rounded-full shadow-md bg-[#5024CE] hover:bg-[#B69DFE] hover:border-[#B69DFE] focus:shadow-outline focus:outline-none hover:transition hover:duration-150 hover:ease-in-out transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100  duration-300"
              >
                Beta User Signup
              </button>
              <button className="text-[18px] sm:text-[24px] font-[500] px-8 h-[80px] sm:px-[50px] sm:py-[18px] rounded-full border-2 border-white hover:underline">
                <a href={`mailto:${contactEmail}`}>Contact Us</a>
              </button>
            </div>
          )}
          <SignUp isOpen={isModalOpen} onClose={closeModal} />

          <span className="text-center mt-[50px] mb-3">
            All Right Reserved - © Copyright Autobongs 2023
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
