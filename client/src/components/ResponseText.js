import profileImage from "../assets/images/response-icon.png";
import React, { useState, useEffect, useContext } from "react";

import TypingInterval from "../helper/typingInterval";
import ResponseLoader from "./ResponseLoader";
import messageContext from "../context/MessageContext";

import {motion} from 'framer-motion'

const ResponseText = ({ keyProp, content, loading }) => {
  console.log(keyProp,"key");
  const { divs,searching,setSearching, } = useContext(messageContext);
   console.log(divs,"divs");
  const [displayedText, setDisplayedText] = useState("");
  const {setChanged} = useContext(messageContext);

  useEffect(()=>{
    setChanged(displayedText)
  },[displayedText])


  // sentence = sentence.trim();
  // var words = sentence.split(/\s+/);
 
  const time=content?.response?.trim()?.split(/\s+/)?.length*0.1;
  console.log(content?.response?.trim()?.split(/\s+/),time,searching,"time");

 

  TypingInterval(content?.response, setDisplayedText);
  if(!content && !loading)return;

  //  if(typeof value === 'number'){
  //   setTimeout(()=>{
  //     setSearching(true);
  //   },time)
  //  }
  if(!loading){
    setSearching(true);
  }

  return (
    <>
    
    <motion.div
      className={`message ${loading ? "new":'message-response'}`}
      >
      <figure className="avatar">
        <img src={profileImage} alt="Icon" />
      </figure>
      {loading && <ResponseLoader />}    
      <span>{displayedText}</span>
      </motion.div>
      </>
  );
};

export default ResponseText;
