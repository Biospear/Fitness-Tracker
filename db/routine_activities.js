const client = require("./client");

async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(
      `SELECT *
          FROM routines
        `
    );
    console.log("These our Routines without Activities", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

// function will be a join
//routineId: bicepRoutine.id,
//  activityId: bicep1.id,
//  count: 10,
//   duration: 5,

async function addActivityToRoutine({
  routineId,
  activityId,
  duration,
  count,
}) {
  try {
    const {
      rows: [routineActivities],
    } = await client.query(
      `
              INSERT INTO routine_activities("routineId", "activityId", duration, count)
              VALUES ($1, $2, $3, $4)
              RETURNING *;
              `,
      //   ON CONFLICT ("routineId", "activityId") DO NOTHING;
      [routineId, activityId, duration, count]
    );

    return routineActivities;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutinesWithoutActivities,
  addActivityToRoutine,
};
