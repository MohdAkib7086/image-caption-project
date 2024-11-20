import React, { useState, useEffect, useRef, useContext } from "react";
import messageContext from "../context/MessageContext";
import ResponseText from "./ResponseText";
import RequestText from "./RequestText";
// import ScrollBottom from "../utilities/scrollBottom";
import ScrollBottom from "../services/scrollBottom";
import callFromSearch from "../services/APIFunCall/callFromSearch";

import BannerType from "./BannerType";

export default function Message(props) {
  const { divs, setDivs, isSuggestionVisible, setIsSuggestionVisible } = useContext(messageContext);
  const scrollRef = useRef(null);
  const User = localStorage.getItem("user") || "User";
  const name = User.split("@")[0].split(".")[0] || "User";

  ScrollBottom(divs, scrollRef);
  const handleButton = async (input) => {
    callFromSearch(input, setDivs, "agent");
    setIsSuggestionVisible(false);
  };

  console.log(divs);

  return (
    <div className="messages">
      <div ref={scrollRef} className="messages-content">
        {isSuggestionVisible && <BannerType headingType={"bannerTitle"} header={`<b>Hello, ${name}</b><br /> What you want to know about LUMIQ today?`} />}
        {divs &&
          divs.map((ele, i) => {
            if (ele.type === "text") {
              if (ele.owner === "app") {
                return <ResponseText keyProp={i} key={i} content={ele.response} loading={ele.loading} />;
              } else if (ele.owner === "me") return <RequestText key={i} content={ele.response} />;
            }
          })}

        {isSuggestionVisible && (
          <div className="suggestion">
            <div className="w-full flex gap-5">
              <p
                className="block flex-1"
                onClick={() => {
                  handleButton("How to connect VPN.");
                }}
              >
                How to connect VPN
              </p>
              <p
                className="block flex-1"
                onClick={() => {
                  handleButton("Tell me about travel policy of LUMIQ.");
                }}
              >
                Tell me about travel policy of LUMIQ
              </p>
            </div>

            <div className="w-full flex gap-5">
              <p
                className="block flex-1"
                onClick={() => {
                  handleButton("Office locations of LUMIQ.");
                }}
              >
                Office locations of LUMIQ
              </p>
              <p
                className="block flex-1"
                onClick={() => {
                  handleButton("What is the LUMIQ standard font");
                }}
              >
                What is the LUMIQ standard font
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
