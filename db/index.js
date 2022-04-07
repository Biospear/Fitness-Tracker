// require and re-export all files in this db directory (users, activities...)
const { createUser, getUser, getUserById } = require("./users");

const {
  createActivity,
  getAllActivities,
  updateActivity,
  getActivityById,
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

const { addActivityToRoutine } = require("./routine_activities");

module.exports = {
  createUser,
  createActivity,
  createRoutine,
  getRoutinesWithoutActivities,
  getAllActivities,
  addActivityToRoutine,
  getUser,
  getUserById,
  updateActivity,
  getActivityById,
  getAllRoutines,
  getRoutineById,
  attachActivitiesToRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  updateRoutine,
  destroyRoutine,
};
