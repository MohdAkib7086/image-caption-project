import React from "react";
// import Header from "../Layouts/Header";
// import SearchBar from "../Layouts/SearchBar";
// import "../styles/style.css";

import MessageState from "../context/MessageState";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

import "../css/components/QNA.scss"
import Message from "../components/Message";
import UploadDoc from "../components/UploadDoc";


const Upload = () => {
  return (
<MessageState>
    <div className="QNA upload">
        <Header content="Upload Documents" />
        {/* <Message /> */}
        {/* <Upload /> */}
        <UploadDoc />
    </div>
    </MessageState>
  );
};

export default Upload;
