const express = require("express");
const routinesRouter = express.Router();
const { getAllPublicRoutines } = require("../db");
const { requireUser } = require("./utils");

routinesRouter.get("/", async (req, res, next) => {
  try {
    const allRoutines = await getAllPublicRoutines();

    res.send(allRoutines);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// routinesRouter.post("/", requireUser, async (req, res, next) => {
//   const { title, content, tags = "" } = req.body;

//   try {
//     const routineData = {
//       authorId: req.user.id,
//       title,
//       content,
//       tags: tagArr,
//     };
//     const routine = await createRoutine(routineData);

//     res.send({ routine });
//     // otherwise, next an appropriate error object
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });

module.exports = routinesRouter;
