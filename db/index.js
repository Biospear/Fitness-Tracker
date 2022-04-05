// require and re-export all files in this db directory (users, activities...)
const { createUser } = require('./users');
const { createActivity } = require('./activities')
const { createRoutine } = require('./routines')


module.exports = {
    createUser,
    createActivity,
    createRoutine,
}