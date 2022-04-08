// create the express server here

const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./api");
const client = require('./db/client');
// require("dotenv").config();
// const morgan = require("morgan");
// app.use(morgan("dev"));

app.use(express.json());

client.connect()

// const bodyParser = require("body-parser");
// Body-parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const { PORT = 3000 } = process.env;
app.use(cors());

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
