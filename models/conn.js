var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'60132323abcd',
	database:'btpns'
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Connectedsss..!');
	}
});

module.exports = connection;