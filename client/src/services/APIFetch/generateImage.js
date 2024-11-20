

const botMessage = async (type, input) => {
  let apiUrl = process.env.REACT_APP_PREDICT_URL;
  console.log(apiUrl, "from botmessage");
  if (type == 'agent') {
    apiUrl = process.env.REACT_APP_PREDICT_URL;
  }
 

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
  var raw;
  var requestOptions;
  if (type == 'generateImage' || type == 'imagePicker') {
    raw = JSON.stringify({
      "prompt": input,
      "style_preset": "photographic"
    });

    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };
  }
  else if (type == 'agent') {
    // raw = JSON.stringify({
    //   "question": input
    // });
    console.log(type)
    raw = JSON.stringify({
      "document_string": "",
      "document_name": "",
      "check":false,
      "query": input
    });


    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  }
  else {
    // raw = JSON.stringify({
    //   "question": input
    // });

    raw = JSON.stringify({
      "document_string": "",
      "document_name": "",
      "check":false,
      "query": input
    });

    requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  }

  const response = await fetch(apiUrl+'/auth/qna', requestOptions).then(response => {
    console.log(requestOptions)
    console.log('sdf',response)
    if (!response.ok) {
      return false
      // navigate(`/login`)
      // throw new Error('Network response was not ok');
    }
    return response.json();
  })
    .then(data => {
      console.log(data);
      return data;

    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  console.log(response);
  return response;
}

export { botMessage };