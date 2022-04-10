// create the express server here
const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./api");
const client = require('./db/client');

// allows this file to read from the .env
require("dotenv").config();

// logging middleware
const morgan = require("morgan");
app.use(morgan("dev"));

// built-in express method that allows body-parsing of incoming json 
app.use(express.json());

// allows api to connect to the db
client.connect()


// allows api test specs to see the server
app.use(cors());

// gives a reference which points to the routes in the api index.js
app.use("/api", apiRouter);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
