const { executeSQL } = require("../db/executesql.js")

const authenticateUser = async ({ email, password }) => {
  if (!email) {
    throw new Error("Email kræves")
  }
  let result
  try {
    const query = `SELECT user_id from users WHERE email = '${email}' AND password = '${password}'`
    result = await executeSQL(query)
  } catch (err) {
    console.error(err)
  }

  console.log(result)
  if (Object.keys(result).length > 0) {
    const userId = result["1"].user_id
    return userId
  }

  return false
}

const createUser = async (user) => {
  try {
    const query = `INSERT INTO users (username, email, password) VALUES 
    ('${user.client_name}', '${user.client_email}', '${user.client_password}')`
    const result = await executeSQL(query)
    return result
  } catch (err) {
    console.error(err)
  }
}

const deleteUser = async (user) => {
  try {
    const query = `DELETE FROM users WHERE user_id = ${user.client_id}`
    const result = await executeSQL(query)
    return result
  } catch (err) {
    console.error(err)
  }
}

module.exports = { executeSQL, authenticateUser, createUser, deleteUser }