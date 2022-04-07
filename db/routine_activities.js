const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  duration,
  count,
}) {
  try {
    const {
      rows: [routineActivities],
    } = await client.query(`
        INSERT INTO routine_activities("routineId", "activityId", duration, count)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [routineId, activityId, duration, count]
    );

    return routineActivities;
  } catch (error) {
    throw error;
  }
}


async function getRoutineActivitiesByRoutine({id}){
    try {
        const {
          rows: [routineActivity],
        } = await client.query(`
        SELECT *
        FROM routine_activities
        WHERE "routineId"=$1
        `, [id]
        );
    
        return routineActivity;
      } catch (error) {
        throw error;
      }
    }

module.exports = {
  addActivityToRoutine,
  getRoutineActivitiesByRoutine
};
