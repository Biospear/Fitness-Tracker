// require and re-export all files in this db directory (users, activities...)
const { createUser } = require("./users");
const { createActivity, getAllActivities } = require("./activities");
const { createRoutine } = require("./routines");
const {
  getRoutinesWithoutActivities,
  addActivityToRoutine,
} = require("./routine_activities");

module.exports = {
  createUser,
  createActivity,
  createRoutine,
  getRoutinesWithoutActivities,
  getAllActivities,
  addActivityToRoutine,
};
