var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'userid',
  password : 'password',
  database : 'schema'
});

connection.connect();

connection.query('select * from user', function(err, rows, fields) {
  if (err) throw err;

  console.log(rows);
});

connection.end();