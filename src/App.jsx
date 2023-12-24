import bgImg from "./assets/smoke2.png";
import "./App.css";
import Header from "./components/Header";

function App() {
  const contactEmail = "info@autobong.com";

 
  return (
    <div
      className=" text-white relative"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 w-full">
        <Header />
      </div>
      <div className="max-w-full w-full h-screen flex flex-col justify-center items-center text-white px-12 sm:px-[0px]">
        <h1
          className="text-[60px] sm:text-[90px] font-[700] uppercase mb-[15px]"
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
        <button className="my-[40px] text-[18px] sm:text-[24px] font-[500] px-8 py-4 sm:px-[50px] sm:py-[22px] border-[1px] border-white rounded-full hover:underline hover:transition hover:duration-150 hover:ease-in-out">
          <a href={`mailto:${contactEmail}`}>Contact Us</a>
        </button>
        <span className="text-center absolute bottom-6">
          All Right Reserved - © Copyright Autobongs 2023
        </span>
      </div>
    </div>
  );
}

export default App;
