import { useEffect, useState } from "react";


const TypingInterval=(content,setDisplayedText)=>{
    const [currentIndex, setCurrentIndex] = useState(0);
    console.log(content);
    useEffect(() => {
      if(!content)return;
        const words = content.split(' ');
    
        const typingInterval = setInterval(() => {
          if (currentIndex < (words || []).length) {
            setDisplayedText(words.slice(0, currentIndex + 1).join(' '));
            setCurrentIndex((prevIndex) => prevIndex + 1);
          } else {
            clearInterval(typingInterval);
          }
        }, 100);
    
        return () => {
          clearInterval(typingInterval);
        };
      }, [content, currentIndex]);

}

export default TypingInterval;