const client = require("./client");


async function getRoutinesWithoutActivities() {
    try {
        const { rows } = await client.query(
          `SELECT "routineId"
          FROM routine_activities;
        `
        );
    
        return rows;
      } catch (error) {
        throw error;
      }
}

async function getAllActivities() {
    try {
        const { rows } = await client.query(
          `SELECT "activityId"
          FROM routine_activities;
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
          INSERT INTO post_tags("routineId", "activityId", duration, count)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT ("routineId", "activityId") DO NOTHING;
        `,
          [routineId, activityId, duration, count]
        );
    
        return rows;
      } catch (error) {
        throw error;
      }
}

module.exports = {
  getRoutinesWithoutActivities,
  getAllActivities,
  addActivityToRoutine,
};
