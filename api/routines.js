const express = require("express");
const routinesRouter = express.Router();

routinesRouter.get("/", (req, res, next) => {
    res.send({ message: 'This is routines' });
});

module.exports = routinesRouter;