import { generateCaption } from "../APIFetch/generateCaption";


const callFromImage = async(reader,setDivs) => {

  setDivs((prevDivs) => {
    return [
      ...prevDivs,
      {
        owner: "me",
        type: "image",
        response: reader.result,
        loading: false,
      },
    ];
  });
  setDivs((prevDivs) => {
    return [
      ...prevDivs,
      {
        type: "text",
        owner: "app",
        response: null,
        loading: true,
      },
    ];
  });

 const response=await generateCaption(reader.result);

 console.log(response);

  // setDivs((prevDivs) => {
  //   const updatedDivs = prevDivs.map((message) =>
  //     message.loading && message.owner === "app"
  //       ? { ...message, loading: false, response: null }
  //       : message
  //   );
  //   console.log(response);
  //   updatedDivs.pop();
  //   return [
  //     ...updatedDivs,
  //     {
  //       owner: "app",
  //       type: "text",
  //       response:response[0].slug,
  //       loading: false,
  //     },
  //   ];
  // });
 
 

  setTimeout(() => {
    // let response = `1. Summary, brief, digest, synopsis are ter `;
    setDivs((prevDivs) => {
      const updatedDivs = prevDivs.map((message) =>
        message.loading && message.owner === "app"
          ? { ...message, loading: false, response: null }
          : message
      );
      updatedDivs.pop();
      return [
        ...updatedDivs,
        {
          owner: "app",
          type: "text",
          response:response,
          // response:response[0].slug,
          loading: false,
        },
      ];
    });
  }, 3000);
};

export default callFromImage