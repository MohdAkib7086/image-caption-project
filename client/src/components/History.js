import React, { useState, useEffect, useRef, useContext } from "react";
import messageContext from "../context/MessageContext";
import ResponseText from "./ResponseText";
import RequestText from "./RequestText";

export default function History(props) {
  const { favorites, setFavorites } = useContext(messageContext);

//   const newObject = {
//     question: 'Question', // Update a specific key
//     answer: 'Apologies, but the provided context does not contain enough information for me to answer your question related to \"google\". Providing more specific details or context may allow me to give a more accurate answer. I strive to continuously learn and increase my knowledge base.', // Add a new key-value pair
//   } ;

//   setFavorites(favorites => [...favorites, newObject]);

  return (
    <div className="messages">
      <div className="messages-content">
        {favorites &&
          favorites.map((ele, i) => {
              if (ele === "question") {
                return (
                  <ResponseText
                    keyProp={i}
                    key={i}
                    content={ele.response}
                    loading={ele.loading}
                  />
                );
              } else if (ele === "me")
                return <RequestText key={i} content={ele.response} />;
          })}
      </div>
    </div>
  );
}
