import React, { useState, useRef, useContext, useEffect } from "react";

// import sendImage from "../assets/images/send.svg";
import sendImage from "../assets/images/send.svg"

import { autoResizeTextarea } from "../helper/useAutosizeTextArea";
import messageContext from "../context/MessageContext";
import callFromSearch from "../services/APIFunCall/callFromSearch";
import axios from 'axios';

import "../css/components/SearchBar.scss"

const SearchBar = ({type}) => {
  const User = localStorage.getItem("user") || "User";
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4000/auth/my-profile',{email:User});
        console.log(response,"res");
        setData(response);
        setIsLoading(false); // For demonstration, assuming we're not checking any flags
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 
  
  const { divs, setDivs,setIsSuggestionVisible,searching,setSearching } = useContext(messageContext);
  const [inputValue, setInputValue] = useState("");

  const textAreaRef = useRef(null);
  const handleTextArea = (event) => {
    setInputValue(event.target.value);
    console.log(textAreaRef.current);
    
    autoResizeTextarea(textAreaRef.current);
  };


  if (isLoading) {
    return;
  }

  console.log(data,User,'data');
  const postData = async () => {
    try {
      const body={
        "document_string": "",
        "document_name": "",
        "query": "",
        "check": true
      }
        const response = await axios.post(process.env.REACT_APP_NEW_CHAT_URL, body);
        console.log(response);
    } catch (error) {
        console.log(error); // Assuming your API returns error details in the response
    }

  };
  const handleButton = async () => {
    if(!searching){
      return;
    }
    setSearching(false);
    if (inputValue.trim() === "") return;
    callFromSearch(inputValue, setDivs,type);
    setInputValue("");
    setIsSuggestionVisible(false);
    const textarea = textAreaRef.current;
    textarea.style.height='25px'
  };
  const handleEnterPress = async(event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleButton();
    }
    else if(event.key === '`') {
      // Call your function here
      // yourFunction();
      await postData();
    }
  };

  return (
    <div className="search-bar">
      <textarea
        className="message-input"
        ref={textAreaRef}
        value={inputValue}
        onChange={handleTextArea}
        onKeyDown={handleEnterPress}
        placeholder="Type a message..."
        style={{ minHeight: '25px', maxHeight: '84px', resize: 'none' }}
        
      />
      <button
        onClick={handleButton}
        // tabIndex="0"
        style={{ border: "none",background:'none' }}
      >
        <img src={sendImage} alt="Image" width="100%" />
      </button>
    </div>
  );
};

export default SearchBar;
