// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router

const express = require("express");
const apiRouter = express.Router();
// require("dotenv").config();

const usersRouter = require("./users");
const routinesRouter = require("./routines")
const activitiesRouter = require("./activities")
const routine_activitiesRouter = require("./routine_activities")

apiRouter.use("/users", usersRouter);
apiRouter.use("/routines", routinesRouter)
apiRouter.use("/activities", activitiesRouter)
apiRouter.use("/routine_activities", routine_activitiesRouter)

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