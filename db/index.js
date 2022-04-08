// require and re-export all files in this db directory (users, activities...)
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
} = require("./users");

const {
  createActivity,
  getActivityById,
  getAllActivities,
  updateActivity,
  attachActivitiesToRoutines,
} = require("./activities");

const {
  createRoutine,
  getRoutinesWithoutActivities,
  getRoutineById,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  updateRoutine,
  destroyRoutine,
} = require("./routines");

const {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
} = require("./routine_activities");

module.exports = {
  ...require("./users"),
  ...require("./activities"),
  ...require("./routines"),
  ...require("./routine_activities"),
};
