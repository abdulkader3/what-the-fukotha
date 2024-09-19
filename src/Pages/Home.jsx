import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from "react-toastify";
import { useDispatch } from "react-redux";


const Home = () => {

    //navigate user
    const navigate = useNavigate()
    const dispatch = useDispatch()


  // firebase database
  const auth = getAuth();

  // state part
  const [email, upemail] = useState("");
  const [emailError, upemailError] = useState("");
  const [password, uppassword] = useState("");
  const [passwordError, uppasswordError] = useState("");

  // for trainary oparotor
  const [one, tow] = useState(false);

  const iconPassword = () => {
    tow(!one);
  };

  // console part for chack

  // input funtion
  const emailFuntion = (e) => {
    upemail(e.target.value);
    upemailError("");
  };

  const passwordFuntion = (e) => {
    uppassword(e.target.value);
    uppasswordError("");
  };

  // submit funtion part
  const submitFuntion = (e) => {
    e.preventDefault();

    if (!email) {
      upemailError("please enter your email");
    } else if (!password) {
      uppasswordError("please enter your password");
    } else {
      // user data in firebase
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          
          const user = userCredential.user;
          // ...
          if(user.emailVerified == false){
            toast.error("Email is not verified !", {
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
          }else{
            toast.success("Login successful ✅", {
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



        })
        .catch((error) => {
          const errorCode = error.code;

          if( errorCode == 'auth/invalid-credential'){
            toast.error("Password incorrect !", {
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
  };

  // condition part

  return (
    <>
      <div className=" w-full h-full ">
        <div className=" w-full h-full flex justify-center items-center ">
          <div className=" w-[400px] h-[600px] flex flex-col items-center bg-[#e1b42f]  ">
            <form onSubmit={submitFuntion}>
              <h1 className=" text-[30px] font-semibold text-center mt-7 mb-16 ">
                Loging{" "}
              </h1>
              <div className=" w-full flex justify-center">
                <div className=" ">
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
                      placeholder="user password"
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

            <Link className="text-[#fff] mt-10" to="/register">
              {" "}
              Don't have an account ? register{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
