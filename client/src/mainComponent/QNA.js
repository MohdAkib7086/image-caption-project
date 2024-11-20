import React from "react";
// import Header from "../Layouts/Header";
// import SearchBar from "../Layouts/SearchBar";
// import "../styles/style.css";

import MessageState from "../context/MessageState";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

import "../css/components/QNA.scss";
import Message from "../components/Message";
import { useLocation } from "react-router-dom";

const QNA = () => {
  const User = localStorage.getItem("user") || "User";

  return (
    <div className="QNA">
      <Header content="Know About LUMIQ" />
      <Message />
      <div className="message-box-image">
        <div className="message-box">
          {/* <ImageUpload /> */}
          <SearchBar type={"agent"} />
        </div>
      </div>
    </div>
  );
};

export default QNA;
