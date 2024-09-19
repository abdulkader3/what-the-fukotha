import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
const Register = () => {


    // to navigate user to the lagin page
    const navigate = useNavigate()


  // firebase database
  const auth = getAuth();

  // state part
  const [name, upname] = useState("");
  const [nameError, upnameError] = useState("");
  const [email, upemail] = useState("");
  const [emailError, upemailError] = useState("");
  const [confirmpassword, upconfirmpassword] = useState("");
  const [confirmpasswordError, upconfirmpasswordError] = useState("");
  const [password, uppassword] = useState("");
  const [passwordError, uppasswordError] = useState("");

  // for trainary oparotor
  const [one, tow] = useState(false);

  const iconPassword = () => {
    tow(!one);
  };
  const [three, four] = useState(false);

  const threeFuntion = () => {
    four(!three);
  };

  // console part for chack

  // input funtion
  const nameFuntion = (e) => {
    upname(e.target.value);
    upnameError("");
  };
  const emailFuntion = (e) => {
    upemail(e.target.value);
    upemailError("");
  };

  const passwordFuntion = (e) => {
    uppassword(e.target.value);
    uppasswordError("");
  };
  const confirmpasswordFuntion = (e) => {
    upconfirmpassword(e.target.value);
    upconfirmpasswordError("");
  };

  // submit funtion part
  const submitFuntion = (e) => {
    e.preventDefault();
    
    if (!name) {
      upnameError("please enter your name");
    } else if (!email) {
      upemailError("please enter your email");
    } else if (!password) {
      uppasswordError("please enter your password");
    } else if (!confirmpassword) {
      upconfirmpasswordError("please confirm your password");
    } else {
      if (password !== confirmpassword) {
        toast.warn("Password did not match!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        // send data to firebase
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
  
            // send user verification mail after the user is created
            sendEmailVerification(user)
              .then(() => {
                toast.success("Verification email sent ✅", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                });
  
                // navigate user to the login page after email is sent
                navigate('/');
              });
  
          })
          .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
  
            // condition for toastify message
            if (errorCode === 'auth/email-already-in-use') {
              toast.error("Already have an account with this email!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
            }
            if (errorCode === 'auth/weak-password') {
              toast.error("password id too short !", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
            }
          });
      }
    }
  };
  

  // condition part

  return (
    <>
      <div className=" w-full h-full ">
        <div className=" w-full h-[100vh] flex justify-center items-center ">
          <div className=" w-[400px] h-full flex flex-col items-center bg-[#2fe1db]  ">
            <form onSubmit={submitFuntion}>
              <h1 className=" text-[30px] font-semibold text-center mt-7 mb-16 ">
                Sing up{" "}
              </h1>
              <div className=" w-full flex justify-center">
                <div className=" ">
                  <p className="text-[20px]">Name</p>

                  <div className=" w-[300px] h-[40px] ">
                    <input
                      onChange={nameFuntion}
                      className=" w-[300px]  pl-5 h-[40px] bg-transparent border-[1px] rounded-md mt-4 mb-5  "
                      type="text"
                      placeholder=" user name"
                    />
                  </div>
                  <p className="text-[12px] mt-5 text-[#ff1d1d] pl-2 ">
                    {nameError}
                  </p>

                  <p className="text-[20px]">Email</p>

                  <div className=" w-[300px] h-[40px] ">
                    <input
                      onChange={emailFuntion}
                      className=" w-[300px]  pl-5 h-[40px] bg-transparent border-[1px] rounded-md mt-4 mb-5  "
                      type="email"
                      placeholder=" user email"
                    />
                  </div>
                  <p className="text-[12px] mt-5 text-[#ff1d1d] pl-2 ">
                    {emailError}
                  </p>

                  <p className=" text-[20px] mt-5 ">password</p>

                  <div className=" w-[300px] relative h-[40px] ">
                    <input
                      onChange={passwordFuntion}
                      className="w-[300px] pl-5 h-[40px] bg-transparent border-[1px]  rounded-md mt-4 mb-5"
                      type={one ? "text" : "password"}
                      placeholder=" password"
                    />
                    {one ? (
                      <FaEye
                        onClick={iconPassword}
                        className=" absolute top-[28px] right-[15px] "
                      />
                    ) : (
                      <FaEyeSlash
                        onClick={iconPassword}
                        className=" absolute top-[28px] right-[15px] "
                      />
                    )}
                  </div>

                  <p className="text-[12px] mt-5 text-[#ff1d1d] pl-2 ">
                    {" "}
                    {passwordError}{" "}
                  </p>

                  <div className=" w-[300px] mt-5 relative h-[40px] ">
                    <input
                      onChange={confirmpasswordFuntion}
                      className="w-[300px] pl-5 h-[40px] bg-transparent border-[1px]  rounded-md mt-4 mb-5"
                      type={three ? "text" : "password"}
                      placeholder="confirme password"
                    />
                    {three ? (
                      <FaEye
                        onClick={threeFuntion}
                        className=" absolute top-[28px] right-[15px] "
                      />
                    ) : (
                      <FaEyeSlash
                        onClick={threeFuntion}
                        className=" absolute top-[28px] right-[15px] "
                      />
                    )}
                  </div>
                  <p className="text-[12px] mt-5 text-[#ff1d1d] pl-2 ">
                    {" "}
                    {confirmpasswordError}{" "}
                  </p>
                  <br />
                </div>
              </div>
              <div className="w-full flex justify-center ">
                <button className=" bg-white w-[80px] h-[40px] mt-5 rounded-md hover:bg-transparent hover:border-[2px] hover:scale-110 active:scale-95 transition-all ">
                  {" "}
                  Loging{" "}
                </button>
              </div>
            </form>

            <Link className="text-[#fff] mt-10" to="/">
              {" "}
              Already have an account ? Login{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
