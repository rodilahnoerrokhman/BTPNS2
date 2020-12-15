var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'db-mysql',
	user:'root',
	password:'60132323abcd',
	database:'btpns'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
		process.exit(1)
	} else {
		console.log('Connectedsss..!');
	}
});

module.exports = connection;