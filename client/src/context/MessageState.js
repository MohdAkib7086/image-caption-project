import React, { useContext, useEffect, useRef, useState } from "react";
import messageContext from "./MessageContext";

const MessageState = (props) => {
  const [divs, setDivs] = useState([]);
  const [displayedText, setDisplayedText] = useState('');
  const [changed, setChanged] = useState('')
  const [isSuggestionVisible, setIsSuggestionVisible] = useState(true);
  const [searching, setSearching] = useState(true);

  const [favorites,setFavorites]=useState([]);

  // console.log(favorites)

  return (
    <messageContext.Provider
      value={{
        divs,
        setDivs,
        displayedText,setDisplayedText,
        changed,setChanged,
        isSuggestionVisible,setIsSuggestionVisible,
        searching, setSearching,
        favorites,setFavorites
      }}
    >
      {props.children}
    </messageContext.Provider>
  );
};

export default MessageState;

