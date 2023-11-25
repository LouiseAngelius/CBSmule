const Connection = require("tedious").Connection
const Request = require("tedious").Request

const config = require("./config.json")

const executeSQL = (query) => {
  return new Promise((resolve, reject) => {
    const connection = new Connection(config)
    const request = new Request(query, function (err) {
      if (err) {
        reject(err)
      }
    })

    connection.on("connect", function (err) {
      if (err) {
        reject(err)
      } else {
        console.log("Connected to the database")
        connection.execSql(request)
      }
    })
    connection.connect()

    let counter = 1
    let response = {}

    request.on("row", function (columns) {
      response[counter] = {}
      columns.forEach(function (column) {
        response[counter][column.metadata.colName] = column.value
      })
      counter += 1
    })
    request.on("requestCompleted", () => {
      resolve(response)
    })
  })
}

module.exports = { executeSQL }