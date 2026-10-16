require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;

const cors = require('cors');

app.use(cors());

app.use(express.json());

const authenticateUser = require('./middleware/authMiddleware');
const userRoute = require("./routes/userRoute");
const dbConnection = require("./config/dbConfig");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require('./routes/answerRoute');

// user routes middleware
app.use("/api/users", userRoute);
// question routes middleware
app.use("/api/questions", authenticateUser, questionRoute);
// answer routes middleware
app.use("/api/answers", authenticateUser, answerRoute);

const start = async () => {
  try {
    const result = await dbConnection.execute("select 'test'");
    await app.listen(port);
    console.log("Database connected successfully");
    console.log(`Listening on port: ${port}`);
  } catch (error) {
    console.log(error.message);
  }
};

start();
