
import axios from "axios";
async function generateCaption(base64url) {
    const apiUrl = process.env.REACT_APP_CAPTION_URL;
    console.log(apiUrl);
    console.log(base64url);
  
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var raw = JSON.stringify({
        base_64_image: base64url.split("base64,")[1],
      });
  
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      const response = await fetch(apiUrl, requestOptions);
      const result = await response.json();
  
      console.log(result.response);
  
      if (result?.status_code === 0) {
      //   messageText.css("color", "red");
      }
  
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

// const url = "https://api.unsplash.com/search/photos";
// const getData = async (term) => {
//   const response = await axios.get(url, {
//     headers: {
//       Authorization: "Client-ID -ANB5x72C6lOTcUVZ4qEfxPPepNo0SuBE7G7FXyT-cw",
//     },
//     params: {
//       query: term[0],
//     },
//   });
// //   console.log(response);
//   return response.data.results;
// };
  
  export {generateCaption}
  