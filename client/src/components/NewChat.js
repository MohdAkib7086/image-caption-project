import React, { useContext } from "react";
import newChatIcon from "../assets/images/new-chat.jpg";
import messageContext from "../context/MessageContext";
import axios from 'axios';


const NewChat = () => {
  const { divs, setDivs, isSuggestionVisible, setIsSuggestionVisible } = useContext(messageContext);

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
  const reformat = async() => {
    setDivs([]);
    setIsSuggestionVisible(true);
    console.log("king", isSuggestionVisible, divs);
    await postData();
  };
  return (
    <div className="new-chat border border-1 border-white flex justify-center gap-2 text-lg" onClick={reformat}>
      {/* <div className="icon">
            <img src ={newChatIcon} />
        </div> */}
      <p>New Chat</p>
      <div className="mt-1">
        <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 7H5.00667M8 7H8.00667M11 7H11.0067M4.66667 12V13.557C4.66667 13.9122 4.66667 14.0898 4.73949 14.1811C4.80282 14.2604 4.89885 14.3066 5.00036 14.3065C5.11708 14.3063 5.25578 14.1954 5.53317 13.9735L7.12348 12.7012C7.44834 12.4413 7.61078 12.3114 7.79166 12.219C7.95213 12.137 8.12295 12.0771 8.29948 12.0408C8.49845 12 8.70646 12 9.1225 12H10.8C11.9201 12 12.4802 12 12.908 11.782C13.2843 11.5903 13.5903 11.2843 13.782 10.908C14 10.4802 14 9.9201 14 8.8V5.2C14 4.07989 14 3.51984 13.782 3.09202C13.5903 2.71569 13.2843 2.40973 12.908 2.21799C12.4802 2 11.9201 2 10.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V9.33333C2 9.95331 2 10.2633 2.06815 10.5176C2.25308 11.2078 2.79218 11.7469 3.48236 11.9319C3.7367 12 4.04669 12 4.66667 12ZM5.33333 7C5.33333 7.18409 5.1841 7.33333 5 7.33333C4.81591 7.33333 4.66667 7.18409 4.66667 7C4.66667 6.8159 4.81591 6.66667 5 6.66667C5.1841 6.66667 5.33333 6.8159 5.33333 7ZM8.33333 7C8.33333 7.18409 8.1841 7.33333 8 7.33333C7.81591 7.33333 7.66667 7.18409 7.66667 7C7.66667 6.8159 7.81591 6.66667 8 6.66667C8.1841 6.66667 8.33333 6.8159 8.33333 7ZM11.3333 7C11.3333 7.18409 11.1841 7.33333 11 7.33333C10.8159 7.33333 10.6667 7.18409 10.6667 7C10.6667 6.8159 10.8159 6.66667 11 6.66667C11.1841 6.66667 11.3333 6.8159 11.3333 7Z"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default NewChat;
