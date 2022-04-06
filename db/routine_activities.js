const client = require("./client");


async function getRoutinesWithoutActivities() {
    try {
        const { rows } = await client.query(
          `SELECT *
          FROM routines;
        `
        );
    
        return rows;
      } catch (error) {
        throw error;
      }
}


async function addActivityToRoutine({
  routineId,
  activityId,
  duration,
  count,
}) {
    try {
        const { rows } = await client.query(
          `
          INSERT INTO routine_activities("routineId", "activityId", duration, count)
          VALUES ($1, $2, $3, $4)
          `,
        //   ON CONFLICT ("routineId", "activityId") DO NOTHING;
          [routineId, activityId, duration, count]
        );
    
        return rows;
      } catch (error) {
        throw error;
      }
}

module.exports = {
  getRoutinesWithoutActivities,
  addActivityToRoutine,
};
