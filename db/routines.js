const client = require("./client");

const { mapTheRows } = require("./utils");

const { attachActivitiesToRoutines } = require("./activities");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
          INSERT INTO routines("creatorId", "isPublic", name, goal) 
          VALUES($1, $2, $3, $4)  
          RETURNING *;
          `,
      [creatorId, isPublic, name, goal]
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM routines
      `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const { rows } = await client.query(`
    SELECT 
        routines.id AS id,
        users.id AS "creatorId",
        users.username AS "creatorName",
        routines."isPublic" AS "isPublic",
        routines.name AS name,
        routines.goal AS goal,
        activities.id AS "activitiesId",
        routine_activities.count AS "activityCount",
        routine_activities.duration AS "activityDuration"
    FROM routines
    LEFT JOIN users ON routines."creatorId" = users.id
    LEFT JOIN routine_activities ON routines.id = routine_activities."routineId"
    LEFT JOIN activities ON routine_activities."activityId" = activities.id
    `);
    return attachActivitiesToRoutines(rows);
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows } = await client.query(`
    SELECT 
        routines.id AS id,
        users.id AS "creatorId",
        users.username AS "creatorName",
        routines."isPublic" AS "isPublic",
        routines.name AS name,
        routines.goal AS goal,
        activities.id AS "activitiesId",
        routine_activities.count AS "activityCount",
        routine_activities.duration AS "activityDuration"
    FROM routines
    LEFT JOIN users ON routines."creatorId" = users.id
    LEFT JOIN routine_activities ON routines.id = routine_activities."routineId"
    LEFT JOIN activities ON routine_activities."activityId" = activities.id
    WHERE routines."isPublic"=true
    `);
    return attachActivitiesToRoutines(rows);
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser(user) {
  try {
    const { rows } = await client.query(
      `
    SELECT 
        routines.id AS id,
        users.id AS "creatorId",
        users.username AS "creatorName",
        routines."isPublic" AS "isPublic",
        routines.name AS name,
        routines.goal AS goal,
        activities.id AS "activitiesId",
        routine_activities.count AS "activityCount",
        routine_activities.duration AS "activityDuration"
    FROM routines
    LEFT JOIN users ON routines."creatorId" = users.id
    LEFT JOIN routine_activities ON routines.id = routine_activities."routineId"
    LEFT JOIN activities ON routine_activities."activityId" = activities.id
    WHERE users.id=$1
    AND users.username=$2
    AND users.password=$3
    `,
    [user.id, user.username, user.password]
    );
    return attachActivitiesToRoutines(rows);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoutine,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
};
