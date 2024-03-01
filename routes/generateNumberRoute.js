const express = require("express");
const route = express.Router();
const randomNumCon = require("../controllers/randomNumberController");
// createRecords

route.post("/createRecords", randomNumCon.createRecords);
route.get("/get-csv", randomNumCon.getRecords);
route.post("/upload-csv", randomNumCon.uploadCsvFile.single("file"), randomNumCon.uploadFile);

route.get("/compute/single_thread", randomNumCon.ComputeData);

module.exports = route;