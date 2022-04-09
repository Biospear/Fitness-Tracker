const client = require("./client");

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password) 
        VALUES($1, $2)  
        RETURNING id, username;
        `,
      [username, password]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT id, username
    FROM users
    WHERE username = $1
    AND password = $2
  `,
      [username, password]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, username
      FROM users
      WHERE id=$1
    `,
      [userId]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

// async function getUserByUsername(userName) {
//   // first get the user
//   try {
//     const {rows} = await client.query(`
//       SELECT *
//       FROM users
//       WHERE username = $1;
//     `, [userName]);
//     console.log('ROWS', rows)
//     // if it doesn't exist, return null
//     if (!rows || !rows.length) return null;
//     // if it does:
//     // delete the 'password' key from the returned object
//     const [user] = rows;
//     // delete user.password;
//     return user;
//   } catch (error) {
//     console.error(error)
//   }
// }

async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=$1
      `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
