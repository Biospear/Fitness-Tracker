const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/register", (req, res, next) => {
    res.send({ message: 'This is users register' });
});

module.exports = usersRouter;