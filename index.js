// create the express server here

const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./api");
// require("dotenv").config();
// const morgan = require("morgan");
// app.use(morgan("dev"));
// app.use(express.json());

const { PORT = 3000 } = process.env;
app.use(cors());

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});

// app.listen(80, () => {
//   console.log("CORS-enabled web server listening on port 80");
// });
