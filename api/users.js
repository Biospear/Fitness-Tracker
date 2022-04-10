const express = require("express");
const usersRouter = express.Router();
const {
  getUserByUsername,
  createUser,
  getPublicRoutinesByUser,
} = require("../db");
const { requireUser } = require("./utils");

require("dotenv").config();
const jwt = require("jsonwebtoken");

usersRouter.use((req, res, next) => {
  // console.log("A request is being made to /users");

  next();
});

//usersRouter.get("/", (req, res, next) => {
//res.send({ message: 'This is users ' });
//});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userAlreadyExists = await getUserByUsername(username);

    // console.log(
    //   "this is our incoming user: ",
    //   username,
    //   "...this is our user check: ",
    //   userAlreadyExists
    // );

    if (userAlreadyExists) {
      res.status(401);
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }

    if (password.length < 8) {
      res.status(401);
      next({
        name: "PasswordTooShort",
        message: "password not long enough",
      });
    }

    const user = await createUser({
      username,
      password,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({ user, message: "thank you for signing up" });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const token = jwt.sign({ username, id: user.id }, process.env.JWT_SECRET);
      // create token & return to user
      res.send({ message: "you're logged in!", token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.get("/me", requireUser, async (req, res, next) => {
  res.send({
    id: req.user.id,
    username: req.user.username,
  });
});

usersRouter.get("/:username/routines", async (req, res, next) => {
  const username = req.params;
  try {
    const routines = await getPublicRoutinesByUser(username);

    res.send(routines);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
