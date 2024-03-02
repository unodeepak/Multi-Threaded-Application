require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
const generateNumRoute = require("./routes/generateNumberRoute");

app.use(cors());
app.use(express.json());
app.use("/api", generateNumRoute);

const PORT = process.env.PORT || 5000;
const username = process.env.username;
const password = process.env.password;

const connectToDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.jeju0ct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
      bufferCommands: false, // Disable command buffering
    });
    console.log("database connected");
  } catch (err) {
    console.log("error in connection db", err);
  }
};

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running ${PORT}`);
});

/* 
Error  MongooseError: Operation `randomnumbers.insertMany()` buffering timed out after 10000ms
    at Timeout.<anonymous> (/home/deepak/Documents/newTask/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:186:23)
    at listOnTimeout (node:internal/timers:559:17)
    at processTimers (node:internal/timers:502:7) {
  insertedDocs: []
}
{ message: 'Error occurred during user generation' }
node:internal/event_target:1011
  process.nextTick(() => { throw err; });

*/
