import React from "react";
import "./Login.scss";
import DnaGifLoader from "../assets/images/dnaGifLoader.gif";
import { useEffect, useState, useContext } from "react";
import CustomerContext from "../stateManagement/customerManagement/context";
import LoginFieldCmp from "../components/LoginField";
import anim1 from "../assets/images/gif2.gif";
// import axios from 'axios';
// import ".."
// import { useNavigate } from 'react-router-dom';
// import LoadGif from "../assets/images/load.gif"


import axios from "axios";
// import "..";
// import { useNavigate } from 'react-router-dom';
import LoadGif from "../assets/images/load.gif";

// import axios from "axios";
import "..";
import { useNavigate } from "react-router-dom";
import { message, notification } from "antd";

const Login = () => {
  const { resetSearchData } = useContext(CustomerContext);

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const [disableButton, setDisableButton] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({ iconText: "", modalMessage: "" });
  const [formData, setFormData] = useState([]);
  const [savedSectionState, setSavedSectionState] = useState({});

  let loginJson = [
    {
      label: "Email",
      type: "text",
      id: "name",
      regex: /^(?=.*lumiq\.ai).+$/,
      maxLength: "",
      error: true,
      value: null,
      key: "userName",
      className: "",
      icon: "Email",
      placeholder: "Enter Username",
    },
    {
      label: "Password",
      type: "password",
      id: "password",
      regex: /[a-zA-Z0-9_@]$/,
      maxLength: "",
      error: true,
      value: null,
      key: "password",
      className: "",
      icon: "Password",
      placeholder: "Enter Password",
    },
  ];

  const handleContinue = async (username, password) => {
    console.log("here");
    try {
      console.log({ email: formData[0].userName, password: formData[1].password });
      localStorage.setItem("user", formData[0].userName);
      const response = await axios.post("http://localhost:4000/auth/login", { email: formData[0].userName, password: formData[1].password });
      console.log(response,"response");
      const { access_token } = response.data;
      localStorage.setItem("token", access_token);

      if (access_token) {
        notification.success({
          message: "Login Success",
        });
      } else {
        notification.error({
          message: "Login Failed",
        });
      }
      navigate(`/qna`);
    } catch (error) {
      console.error("Login failed:", error);
      notification.error({
        message: "Login Failed",
        description: "Please check your credentials",
      });
    }
  };

  useEffect(() => {
    console.log("formData", formData);
    const checkError = formData.map((item) => item.error);
    if (checkError.length && !checkError.includes(true)) {
      setDisableButton(false);
      console.log(false);
    } else {
      setDisableButton(true);
      console.log(true);
    }
  }, [formData]);

  const handleSearchData = (data, value) => {
    setLoginData((prev) => ({
      ...prev,
      [data.key]: value,
    }));
  };
  const getFormJson = (value, key, error = false) => {
    console.log("getFormJson", value, key, error);
    let keyAvailable = true;
    formData.map((data, index) => {
      if (key in data) {
        keyAvailable = false;
        setFormData(
          [...formData].map((object) => {
            if (Object.keys(object)[0] === key) {
              object[key] = value;
              object["error"] = error;
              return object;
            } else return object;
          })
        );
      }
    });
    if (keyAvailable) {
      setFormData((prev) => [...prev, { [key]: value, ["error"]: error }]);
    }
  };

  // console.log("sdfgkhjhkj", user);
  return (
    <>
      <div className="login-page">
        <div className="login-form-area">
          
          <div className="login-title">
            <h2>LumiqRover.ai</h2>
            <h3 className="login-light-black">Navigate Your Curiosity</h3>
          </div>
          <div className="form">
            {loginJson.length &&
              loginJson.map((item, index) => {
                return <LoginFieldCmp item={item} setDisableButton={setDisableButton} getFormJson={getFormJson} handleSearchData={handleSearchData} savedSectionState={savedSectionState} searchItem={false}></LoginFieldCmp>;
              })}
            {/* <div className="form-field fieldCheckbox">
              <div className="field-input">
                <a className="forgot-link">Forgot Password?</a>
              </div>
            </div> */}
            <div className="form-field">
              <button onClick={handleContinue} disabled={disableButton}>
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="login-gif">
          <img className="shrink-0" src={anim1} alt="User Image" />
        </div>
      </div>
    </>
  );
};

export default Login;
