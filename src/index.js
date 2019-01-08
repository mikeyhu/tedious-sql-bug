const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const config = {
  server: process.env.SQL_SERVER,
  userName: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD
};

const testNumber = 99999999999999;
const padding = 40;

console.log('Javascript number'.padEnd(padding),testNumber);

const connection = new Connection(config);

connection.on('connect', function (err) {
    if (err) return console.error(err);
    executeStatement();
  }
);

function executeStatement() {
  const request = new Request(`SELECT 
    @testNumber as numberAsDecimal, 
    convert(varchar,@testNumber) numberAsDecimalToString, 
    @testNumber - floor(@testNumber) as numberAsDecimalAfterPoint,
    convert(varchar,convert(Decimal(18,4), @testNumberAsString)) stringToDecimalToString
    `, function (err, rowCount) {
    if (err) {
      console.log(err);
    }
    connection.close();
  });

  request.addParameter('testNumber', TYPES.Decimal,testNumber, {precision:18, scale:4});
  request.addParameter('testNumberAsString', TYPES.NVarChar, String(testNumber));

  request.on('row', function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log('NULL');
      } else {
        console.log(`${column.metadata.colName}(${column.metadata.type.type})`.padEnd(padding), column.value);
      }
    });
  });
  connection.execSql(request);
}
