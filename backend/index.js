const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { InterviewerQuestion } = require("./routes/interviewRoutes");
const { userRouters } = require("./routes/userRoutes");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(userRouters);
app.use(InterviewerQuestion);

app.get("/", (req, res) => {
  res.send("<h1>Start Interview</h1>");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB is connect now");
    console.log(`server is running port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
