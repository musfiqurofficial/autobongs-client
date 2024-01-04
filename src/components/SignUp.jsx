/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  AiFillCloseCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import Cookies from "js-cookie";

const SignUp = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // Added for error handling
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    const existingToken = Cookies.get("token");

    if (existingToken) {
      //   navigate("/");
    }
  }, []);

  const handleSignUp = async () => {
    try {
      // Use the state values, not e.target.email and e.target.password
      const response = await fetch(
        "https://audobongs-server.vercel.app/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();
      setError(responseData.message);
      if (responseData.token) {
        console.log("User registered successfully");
        Swal.fire({
          title: "Congratulations!",
          text: "We will be in touch soon",
          icon: "success",
          confirmButtonText: "Ok",
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        Cookies.set("em", responseData.email, { expires: 7 });
        Cookies.set("token", responseData.token, { expires: 7 });
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message); // Assuming the error message is in a "message" field
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(value) ? null : "Invalid email address");
    }

    // Password validation
    if (name === "password") {
      setPasswordError(
        value.length >= 6 ? null : "Password must be at least 6 characters"
      );
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //   const handleModalClose = () => {
  //     const existingToken = Cookies.get("token");

  //     if (!existingToken) {
  //       alert("Signup first");
  //     } else {
  //       onClose();
  //     }
  //   };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50 backdrop-blur">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-4 w-full max-w-md mx-auto rounded-md">
              <button
                onClick={onClose}
                className="absolute top-0 right-0 p-4 text-[#ffffff73] hover:text-white"
              >
                <AiFillCloseCircle className="w-6 h-6" />
              </button>
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <h1
                    className="text-[24px] font-[600] mb-[15px] text-center text-[#5024CE]"
                    style={{
                      textShadow: "0px 0px 3px #ffffff",
                      letterSpacing: "1px",
                    }}
                  >
                    Join the BetaTesting Community Today!
                  </h1>
                </div>

                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#5024CE] sm:text-sm sm:leading-6"
                        />
                        {emailError && (
                          <p className="text-red-500 text-[12px] mt-1">
                            {emailError}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="text-sm">
                          <a
                            href="#"
                            className="font-semibold text-[#5024CE] hover:text-[#B69DFE]"
                          >
                            Forgot password?
                          </a>
                        </div>
                      </div>
                      <div className="mt-1 relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange}
                          autoComplete="current-password"
                          required
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#5024CE] sm:text-sm sm:leading-6"
                        />
                        <button
                          type="button"
                          onClick={toggleShowPassword}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
                        >
                          {showPassword ? (
                            <AiOutlineEye className="h-5 w-5 text-[#EB4A90]" />
                          ) : (
                            <AiOutlineEyeInvisible className="h-5 w-5 text-[#14CB8E]" />
                          )}
                        </button>
                      </div>
                      {passwordError && (
                        <p className="text-red-500 text-[12px] mt-1">
                          {passwordError}
                        </p>
                      )}
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={handleSignUp}
                        disabled={!formData.email || !formData.password}
                        className={`inline-flex items-center justify-center h-12 w-full font-medium tracking-wide text-white transition duration-200 rounded-md shadow-md ${
                          formData.email && formData.password
                            ? "bg-[#5024CE]"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Sing Up
                      </button>
                    </div>
                  </form>
                  {error && (
                    <p className="text-red-500 text-center my-2 text-[12px]">
                      {error}
                    </p>
                  )}
                  <h2 className="text-center text-lg leading-9 tracking-tight text-gray-900 mt-1">
                    or
                  </h2>
                  <center>
                    {/* Sign up with google button  */}
                    <button
                     onClick={() => {
                      window.location.href = 'https://audobongs-server.vercel.app/auth/google'; // Redirect to the authentication route
                    }}
                      className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 outline-none"
                    >
                      <svg
                        className="h-6 w-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="800px"
                        height="800px"
                        viewBox="-0.5 0 48 48"
                        version="1.1"
                      >
                        {" "}
                        <title>Google-color</title>{" "}
                        <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                        <g
                          id="Icons"
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          {" "}
                          <g
                            id="Color-"
                            transform="translate(-401.000000, -860.000000)"
                          >
                            {" "}
                            <g
                              id="Google"
                              transform="translate(401.000000, 860.000000)"
                            >
                              {" "}
                              <path
                                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                id="Fill-1"
                                fill="#FBBC05"
                              >
                                {" "}
                              </path>{" "}
                              <path
                                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                id="Fill-2"
                                fill="#EB4335"
                              >
                                {" "}
                              </path>{" "}
                              <path
                                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                id="Fill-3"
                                fill="#34A853"
                              >
                                {" "}
                              </path>{" "}
                              <path
                                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                id="Fill-4"
                                fill="#4285F4"
                              >
                                {" "}
                              </path>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>{" "}
                      </svg>
                      <span>Continue with Google</span>
                    </button>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
