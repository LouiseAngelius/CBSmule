const { executeSQL } = require("../db/executesql.js")

const authenticateUser = async ({ email, password }) => {
  if (!email) {
    throw new Error("Email is required")
  }

  const query = `SELECT user_id from users WHERE email = '${email}' AND password = '${password}'`
  const result = await executeSQL(query)

  if (result.length > 0) {
    const userId = result[0].user_id
    return userId
  }

  return false
}

const createUser = async (user) => {
  const query = `INSERT INTO users (username, email, password) VALUES 
    ('${user.client_name}', '${user.client_email}', '${user.client_password}')`
  const result = await executeSQL(query)
  return result
}

const deleteUser = async (user) => {
  const query = `DELETE FROM users WHERE user_id = ${user.client_id}`
  const result = await executeSQL(query)
  return result
}

module.exports = { authenticateUser, createUser, deleteUser }