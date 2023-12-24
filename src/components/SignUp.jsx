/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
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
                className="absolute top-0 right-0 p-4 text-white"
              >
                <AiFillCloseCircle className="w-6 h-6" />
              </button>
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <h1
                    className="text-[50px] font-[700] uppercase mb-[15px] text-center text-indigo-600"
                    style={{
                      textShadow: "0px 0px 3px #ffffff",
                      letterSpacing: "1px",
                    }}
                  >
                    AutoBongs
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
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
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
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                            ? "bg-indigo-600"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Sing Up/ Sign in
                      </button>
                    </div>
                  </form>
                  {error && (
                    <p className="text-red-500 text-center my-2 text-[12px]">
                      {error}
                    </p>
                  )}
                  <h2 className="text-center text-xl font-medium leading-9 tracking-tight text-gray-900 mt-6">
                    Sign up to your account
                  </h2>
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
