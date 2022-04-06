const client = require("./client");

const { attachActivitiesToRoutines } = require("./activities")

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
 user.id AS “creatorId”,
 routines.”isPublic” AS “isPublic”,
 routines.name AS name,
 Routines.goal AS goal 

FROM routines
LEFT JOIN users ON routines."creatorId" = users.id
LEFT JOIN tricks ON puppies_tricks.trick_id = tricks.id
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}



        







      
module.exports = {
  createRoutine,
  getRoutinesWithoutActivities,
  getAllRoutines,
};
