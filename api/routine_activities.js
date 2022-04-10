const express = require("express");
const routine_activitiesRouter = express.Router();
const { getRoutineActivityById, updateRoutineActivity } = require("../db");
const { requireUser } = require("./utils");

routine_activitiesRouter.get("/", (req, res, next) => {
    res.send({ message: 'This is routine_activitiesRouter' });
});

routine_activitiesRouter.patch("/:routineActivityId", requireUser, async (req, res, next) => {
    const { routineActivityId } = req.params;
    const { count, duration } = req.body;
    
    // console.log("this is the req.body", req.body)

    const updateFields = {
        id: routineActivityId,
        count, 
        duration
    };
    console.log("this is the input for the update function", updateFields)
    
    try {
        const updatedRoutine = await updateRoutineActivity(updateFields);
        console.log("this is after the function", updatedRoutine)
  
        res.send(updatedRoutine);
    } catch ({ name, message }) {
        console.log({name, message})
      next({ name, message });
    }
  });

module.exports = routine_activitiesRouter;