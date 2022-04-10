const express = require("express");
const routinesRouter = express.Router();
const {
  getAllPublicRoutines,
  createRoutine,
  getRoutineById,
  updateRoutine,
  destroyRoutine,
} = require("../db");
const { requireUser } = require("./utils");

routinesRouter.get("/", async (req, res, next) => {
  try {
    const allRoutines = await getAllPublicRoutines();

    res.send(allRoutines);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.post("/", requireUser, async (req, res, next) => {
  const creatorId = req.user.id;
  const { isPublic, name, goal } = req.body;

  const routineData = {
    creatorId,
    isPublic,
    name,
    goal,
  };

  try {
    const routine = await createRoutine(routineData);

    res.send(routine);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.patch("/:routineId", requireUser, async (req, res, next) => {
  const { routineId } = req.params;
  const creatorId = req.user.id;
  const { isPublic, name, goal } = req.body;

  const updateFields = {
    id: routineId,
    creatorId,
    isPublic,
    name,
    goal,
  };

  try {
    const originalRoutine = await getRoutineById(routineId);

    if (originalRoutine.creatorId === req.user.id) {
      const updatedRoutine = await updateRoutine(updateFields);

      res.send(updatedRoutine);
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a routine that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.delete("/:routineId", requireUser, async (req, res, next) => {
  const { routineId } = req.params;
  const userId = req.user.id;

  try {
    const routine = await getRoutineById(routineId);

    if (routine && routine.creatorId === userId) {
      const destroyedRoutine = await destroyRoutine(routineId);

      res.send(destroyedRoutine);
    } else {
      // if there was a post, throw UnauthorizedUserError, otherwise throw PostNotFoundError
      next(
        routine
          ? {
              name: "UnauthorizedUserError",
              message: "You cannot delete a routine which is not yours",
            }
          : {
              name: "PostNotFoundError",
              message: "That routine does not exist",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = routinesRouter;
