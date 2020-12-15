var connection = require('./conn');

module.exports = {
  getInfo,
  updateSaldo,
  getList
}


//Digunakan untuk ambil data
function getList() {
  var query;

  return new Promise((resolve, reject) => {
    try {
      query = "SELECT * FROM user ORDER BY id";

      console.log("Start query: ", query);

      connection.query(query, function (error, rows, fields){
        console.log("The error: ", error);
        console.log("The rows: ", rows);
        if(error) resolve(error);
        else {
          console.log("The rows: ", rows);
          console.log("Rows length: ", rows.length);
          if (rows.length > 0)  resolve(rows);
          else resolve("");
        }
      });
    } catch (error) {
      resolve(error);
    }
  });
}
  
//Digunakan untuk ambil data Kamar
function updateSaldo(Object) {
  var query;

  return new Promise((resolve, reject) => {
    try {
      //Cek jenis kamar
      query = "UPDATE user set saldo = saldo + " + Object.Saldo + " WHERE id = " + Object.id;
      
      connection.query(query, function (error, rows, fields){
        if(error){
          resolve(error);
        }
        else {
          resolve("");
        }
      });
    } catch (error) {
      resolve(error);
    }
  });
}

//Digunakan untuk ambil data Kamar
function getInfo(id) {
  var query;
  var a;

  return new Promise((resolve, reject) => {
    try {
      //Cek jenis kamar
      query = "SELECT * FROM user WHERE id = " + id;
      
      connection.query(query, function (error, rows, fields){
        a = rows.length;
        if(error) resolve(error);
        else {
          if (rows.length > 0)  resolve(rows[0]);
          else resolve("");
        }
      });
    } catch (error) {
      resolve(error);
    }
  });
}