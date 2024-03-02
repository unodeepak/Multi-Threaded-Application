const RandomNumber = require("../models/randomNumberModel");
const { parentPort } = require("worker_threads");

const generateNumber = async () => {
  try {
    let data = [];
    for (let i = 1; i < 10000; i++) {
      const number = Math.random();
      data.push({ number });
    }

    parentPort.postMessage(data);
  } catch (err) {
    console.log("Error in generateNumber : => ", err);
    parentPort.postMessage("Error occurred during Number generation");
  }
};

generateNumber();