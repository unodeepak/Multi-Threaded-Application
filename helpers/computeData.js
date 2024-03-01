const { parentPort } = require("worker_threads");
const RandomNumber = require("../models/randomNumberModel");

parentPort.on("message", (message) => {
  try {
    const startTime = new Date().getMilliseconds();
    const INITIAL_FACTOR = 100000000;
    var FACTOR = INITIAL_FACTOR;
    
    for (let item of message.data) {
      if (item.number != 0) {
        FACTOR /= item.number;
        FACTOR *= Math.random();
        FACTOR /= item.number;
      }
    }

    /* Start the time calculation */
    const endTime = new Date().getMilliseconds();
    const totalTime = endTime - startTime;

    parentPort.postMessage({
      totalTime,
      FACTOR,
    });
  } catch (err) {
    console.log("Error is ", err);
    parentPort.postMessage("Error during record generating");
  }
});
