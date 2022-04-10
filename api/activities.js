const express = require("express");
const activitiesRouter = express.Router();
const { getAllActivities, createActivity } = require("../db");
const { requireUser } = require("./utils");

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();

    res.send(allActivities);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
  
  activitiesRouter.post("/", requireUser, async (req, res, next) => {
    const { name, description } = req.body;
  
    try {
      const activitiesData = {
        name,
        description
      };
      const activities = await createActivity(activitiesData);
  
      res.send(activities);

    } catch ({ name, message }) {
      next({ name, message });
    }
  });

module.exports = activitiesRouter;
