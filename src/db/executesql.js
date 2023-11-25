const { Connection, Request } = require("tedious");
const config = require("./config.json");

const executeSQL = (query) => {
  return new Promise((resolve, reject) => {
    const connection = new Connection(config);
    const request = new Request(query, (err) => {
      if (err) {
        reject(err);
      }
    });

    connection.on("connect", (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Connected to the database");
        connection.execSql(request);
      }
    });
    connection.connect();

    let response = {};

    request.on("row", (columns) => {
      const rowData = {};
      columns.forEach((column) => {
        rowData[column.metadata.colName] = column.value;
      });
      response[request.rowCount] = rowData;
    });

    request.on("requestCompleted", () => {
      resolve(response);
    });
  });
};

module.exports = { executeSQL };