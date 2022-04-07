// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router

const express = require("express");
const apiRouter = express.Router();
// require("dotenv").config();

apiRouter.get("/health", (req, res, next) => {
    res.send({
        name: 'Health',
        message: "all is well"
    });
});

apiRouter.use((error, req, res, next) => {
    res.send({
      name: error.name,
      message: error.message,
    });
  });

module.exports = apiRouter;