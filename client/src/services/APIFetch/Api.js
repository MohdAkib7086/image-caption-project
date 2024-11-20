

let cardCount = 0;
let searchApiData = [];
let summaryApiData = [];





async function getSummary(currentCard,name,content,setDecisionDisplay) {

  console.log(currentCard);
  cardCount++;
  console.log(currentCard);
   console.log(currentCard,name,content);
  // Check the condition to stop the interval when argumentVariable is 6
  if (currentCard === searchApiData.length) {
    // clearInterval(intervalId);
    console.log("Interval stopped");

  } else {
      const apiUrl = "http://10.221.40.238:8002/getGptResults/";
      const raw = {
        name: name,
        articleTitle: content.articleTitle,
        articleBody: content.articleBody,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(raw),
      };

      const response = await fetch(apiUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("datahereeeee", data);
          console.log("summary-" + currentCard);
          return data;
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
      
        });
        
    
    if(cardCount===searchApiData.length){
      setDecisionDisplay(true);
    }
    return response;
   
  }
}



const getData = async (inputName,inputOccupation,inputOrg,inputOptional) => {
 
  const apiUrl = "http://10.221.40.238:8001/getScrapedData/";

  const raw = {
    name: inputName,

    occupation: inputOccupation,

    company: inputOrg,

    others: inputOptional,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(raw),
  };

  const response = await fetch(apiUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("datahereeeee", data);
      // cardCount = data.body.length;
      var i = 0;
      searchApiData = data.body;
      return searchApiData;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  return response;

};


export { getData,getSummary };
