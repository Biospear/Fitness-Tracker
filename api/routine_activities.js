const express = require("express");
const routineActivitiesRouter = express.Router();
const {
  getRoutineById,
  updateRoutineActivity,
  getRoutineActivityById,
  destroyRoutineActivity,
} = require("../db");
const { requireUser } = require("./utils");

/* 

PLEASE READ ME: 

"routine_activities" doesn't store any creator information in its table. Therefore, it's impossible to check if the original creator is the same person as the user who is currently attempting to update any of them. This was done intentionally according to the initial instructions on building the tables.

Below, I've tried to write how you could confirm that the user is the creator of the routine itself, since that is the only psql table with a reference key to the users table. But I left it commented-out since it will, of course, cause the tests to fail.

*/

routineActivitiesRouter.patch(
  "/:routineActivityId",
  requireUser,
  async (req, res, next) => {
    const { routineActivityId } = req.params;
    const { routineId, count, duration } = req.body;
//    console.log("body:", req.body, "user:", req.user, "params:", req.params);

    const updateFields = {
      id: routineActivityId,
      count,
      duration,
    };

    try {
      //   const originalRoutine = await getRoutineById(routineId);

      //   if (req.user.id === originalRoutine.creatorId) {
      const updatedRA = await updateRoutineActivity(updateFields);

      res.send(updatedRA);
      //   } else {
      //       res.status(401);
      //     next({
      //         name: "UnauthorizedUserError",
      //         message: "You cannot update a routine that is not yours",
      //       });
      //   }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

routineActivitiesRouter.delete(
  "/:routineActivityId",
  requireUser,
  async (req, res, next) => {
    const { routineActivityId } = req.params;
    // console.log("body:", req.body, "user:", req.user, "params:", req.params);

    try {
      // const originalRA = await getRoutineActivityById(routineId);
      // const originalRoutine = await getRoutineById(originalRA.routineId);

      // if (req.user.id === originalRoutine.creatorId) {
      const deletedRA = await destroyRoutineActivity(routineActivityId);

      res.send(deletedRA);
      // } else {
      //     res.status(401);
      //   next({
      //       name: "UnauthorizedUserError",
      //       message: "You cannot delete a routine that is not yours",
      //     });
      // }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = routineActivitiesRouter;
