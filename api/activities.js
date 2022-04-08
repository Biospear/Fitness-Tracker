const express = require("express");
const activitiesRouter = express.Router();

activitiesRouter.get("/", (req, res, next) => {
    res.send({ message: 'This is activities' });
});

module.exports = activitiesRouter;