import React, { useContext, useEffect } from 'react';
import messageContext from '../context/MessageContext';

const ScrollBottom = (divs, scrollRef) => {
  const { displayedText, setDisplayedText ,changed} = useContext(messageContext);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    // console.log(divs[divs.length-1]);
  }, [divs, displayedText,changed]);
}

export default ScrollBottom;