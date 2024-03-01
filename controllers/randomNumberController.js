const RandomNumber = require("../models/randomNumberModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { Worker } = require("worker_threads");

exports.createRecords = async (req, res) => {
  try {
    const count = await RandomNumber.countDocuments();
    if (count >= 100000000) {
      return res
        .status(200)
        .json({ msg: "Records already generated", success: true });
    }

    const worker = new Worker(
      path.join(__dirname, "../helpers/generateNumber.js")
    );
    worker.on("message", async (message) => {
      // console.log({ message });
      await RandomNumber.insertMany(message);
      return res.status(200).json({ msg: "Record Generated", success: true });
    });

    worker.on("error", (err) => {
      console.log(" error is the ", err);
      return res.status(500).json({ msg: err.message, success: false });
    });
  } catch (err) {
    console.log("Error is ", err);
    return res.status(500).json({ msg: err.message });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const data = await RandomNumber.find({});

    return res.status(200).json({ msg: "Data found", success: true, data });
  } catch (err) {
    console.log("Error is ", err);
    return res.status(500).json({ msg: err.message, success: false });
  }
};

const distStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let newPath = path.join(__dirname + "/csvFiles");

    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath, { recursive: true });
    }
    cb(null, newPath);
  },
  filename: function (req, file, cb) {
    const fileArr = file.originalname.split(".");
    const fileName = fileArr[0];
    const extention = fileArr[1];

    cb(null, `./csvFiles-${new Date()}-${fileName}.${extention}`);
  },
});

exports.uploadCsvFile = multer({
  /* Checking if the file already exists or not. */
  fileFilter: function (req, file, cb) {
    cb(null, true);
  },
  storage: distStorage,
});

exports.uploadFile = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ msg: "File updated successfully", success: true });
  } catch (err) {
    console.log("error is ", err);
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.ComputeData = async (req, res) => {
  try {
    const worker = new Worker(
      path.join(__dirname, "../helpers/computeData.js")
    );
    const data = await RandomNumber.find({}).select("number -_id").lean();
    worker.postMessage({ data });
    worker.on("message", async (message) => {
      return res.status(200).json({ ...message, success: true });
    });

    worker.on("error", (err) => {
      console.log(" error is the ", err);
      return res.status(500).json({ msg: err.message, success: false });
    });
  } catch (err) {
    console.log("error is ", err);
    return res.status(500).json({ msg: err.message, success: false });
  }
};
