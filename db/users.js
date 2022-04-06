const { user } = require("pg/lib/defaults");
const client = require("./client");

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password) 
        VALUES($1, $2)  
        RETURNING username;
        `,
      [username, password]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({username, password}) {
  try{
    const { rows: [user] } = await client.query(`
    SELECT username
    FROM users
    WHERE username = $1
    AND password = $2
  `, [username, password]);

  return user;

  }
  catch (error){
    throw error
  }
}


async function getUserById(userId){
  try{
        const { rows } = await client.query(`
      SELECT id, username, password
      FROM users
      WHERE id=$1
    `, [userId]);

    return rows;
  }catch(error){
      throw error 
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
};
