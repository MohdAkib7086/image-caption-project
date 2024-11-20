import React from "react";
// import Header from "../Layouts/Header";
// import SearchBar from "../Layouts/SearchBar";
// import "../styles/style.css";

import MessageState from "../context/MessageState";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

import "../css/components/QNA.scss"
import History from "../components/History";
import Message from "../components/Message";


const Favorites = () => {
  return (
<MessageState>
    <div className="QNA">
        <Header content="Favorites" />
        {/* <Message /> */}
        {/* <div className="message-box-image">
            <div className="message-box"> */}
              {/* <ImageUpload /> */}
              {/* <SearchBar type={"agent"} /> */}
            {/* </div> */}
        {/* </div> */}
        <History />
    </div>
    </MessageState>
  );
};

export default Favorites;
