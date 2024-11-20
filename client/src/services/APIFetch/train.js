async function trainfun() {
  try {
    const trainResponse = await fetch(process.env.REACT_APP_TRAIN_URL);
    const trainResult = await trainResponse.text();
    console.log(trainResult);

    async function Pooling() {
      try {
        const pollResponse = await fetch(process.env.REACT_APP_POLL_URL);
        const pollResult = await pollResponse.json();

        console.log(pollResult);

        if (pollResult?.status) {
          console.log("Model has been trained");
          return;
        }
      } catch (pollError) {
        console.log("Error in pooling:", pollError);
      }
    }

    await Pooling();
  } catch (error) {
    console.log("Error in training:", error);
  }
}
  export default trainfun;