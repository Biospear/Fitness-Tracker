const express = require("express");
const usersRouter = express.Router();
const { getUserByUsername, createUser } = require("../db");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

//usersRouter.get("/", (req, res, next) => {
//res.send({ message: 'This is users ' });
//});

usersRouter.post("/register", async (req, res, next) => {
  console.log("A request is being made to /users/register", req.body);

  try {
    const { username, password } = req.body;
    const _user = await getUserByUsername(username);
    console.log(_user, "this is the user!!!!");
    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }

    if (password) {
      next({
        name: "PasswordToShort",
        message: "password not long enough",
      });
    }

    const user = await createUser({
      username,
      password,
    });

    // const token = jwt.sign(
    //   {
    //     id: user.id,
    //     username,
    //   },
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: "1w",
    //   }
    // );

    res.send({ _user, message: "thank you for signing up", token });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
