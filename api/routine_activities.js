const express = require("express");
const routine_activitiesRouter = express.Router();

routine_activitiesRouter.get("/", (req, res, next) => {
    res.send({ message: 'This is routine_activitiesRouter' });
});

module.exports = routine_activitiesRouter;