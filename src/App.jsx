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
            className="text-[50px] sm:text-[115px] font-[700] uppercase headline-text tracking-[10px] sm:tracking-[20px] "
            style={{ textShadow: "5px 3px 5px #000000", lineHeight: "1.3" }}
          >
            AutoBongs
          </h1>
          <p
            className="text-[18px] sm:text-[35.5px] font-[700] text-center mb-[60px] mt-[0px] fontStyle"
            style={{ textShadow: "5px 3px 5px #000000",lineHeight: "1.0", }}
          >
            Autobongs is an innovative and optimized <br /> ecommerce platform
            for devices and accessories <br /> used in the enjoyment of
            cannabis, nicotine, and <br /> functional mushrooms.
          </p>
          {existingToken ? (
            <button className="text-[18px] sm:text-[24px] font-[500] px-8 h-[74px] sm:px-[60px]  rounded-full border-[1px] border-white underline">
              <a href={`mailto:${contactEmail}`}>Contact Us</a>
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              {" "}
              <button
                onClick={openModal}
                className="text-[18px] sm:text-[24px] font-[500] px-8 h-[74px] sm:px-[50px]  rounded-full border-[1px] border-white underline"
              >
                Beta User Signup
              </button>
              <button className="text-[18px] sm:text-[24px] font-[500] px-8 h-[74px] sm:px-[60px]  rounded-full border-[1px] border-white underline">
                <a href={`mailto:${contactEmail}`}>Contact Us</a>
              </button>
            </div>
          )}
          <SignUp isOpen={isModalOpen} onClose={closeModal} />

          <span className="text-center text-[21px] mt-[40px]">
            All Right Reserved - © Copyright Autobongs 2023
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
