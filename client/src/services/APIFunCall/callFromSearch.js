import { botMessage } from "../APIFetch/generateImage";

const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substring(2, 9);
};
const callFromSearch = async (inputValue, setDivs, type) => {
  const requestId = generateUniqueId();
  setDivs((prevDivs) => {
    return [
      ...prevDivs,
      {
        id: requestId,
        type: "text",
        owner: "me",
        response: inputValue,
        loading: false,
      },
    ];
  });

  // const response=await fetchApi(inputValue);
  setDivs((prevDivs) => {
    return [
      ...prevDivs,
      {
        id: requestId,
        type: "text",
        owner: "app",
        response: null,
        loading: true,
      },
    ];
  });

  const response = await botMessage(type, inputValue);
  console.log("sdfdssdfd", response);
  // if(response===false){


  if (type === "QNA") {

    setDivs((prevDivs) => {
      const index = prevDivs.findIndex((div) => {
        return (div.id === requestId && div.loading === true)
      });
      if (index !== -1) {
        return [...prevDivs.slice(0, index), ...prevDivs.slice(index + 1), {
          type: "table",
          owner: "app",
          response,
          loading: false
        }];
      }
      return prevDivs;
    })
  }

  else if (type === "agent") {

    setDivs((prevDivs) => {
      const index = prevDivs.findIndex((div) => {
        return (div.id === requestId && div.loading === true)
      });
      if (index !== -1) {
        return [...prevDivs.slice(0, index), ...prevDivs.slice(index + 1), {
          type: "text",
          owner: "app",
          response,
          loading: false
        }];
      }
      return prevDivs;
    })

  }
  else {

    setDivs((prevDivs) => {

      const index = prevDivs.findIndex((div) => {
        return (div.id === requestId && div.loading === true)
      });////
      if (index !== -1) {
        return [...prevDivs.slice(0, index), ...prevDivs.slice(index + 1), {
          type: "image",
          owner: "app",
          response: response,
          loading: false
        }];
      }
      return prevDivs;
    })
  }

}

export default callFromSearch;