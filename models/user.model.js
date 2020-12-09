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
      query = "SELECT * FROM User ORDER BY id";

      connection.query(query, function (error, rows, fields){
        if(error) resolve(error);
        else {
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
      query = "UPDATE User set Saldo = Saldo + " + Object.Saldo + " WHERE id = " + Object.id;
      
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
      query = "SELECT * FROM User WHERE id = " + id;
      
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