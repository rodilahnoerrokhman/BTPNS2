var connection = require('./conn');

module.exports = {
  getInfo,
  getList
}

//Digunakan untuk ambil data
function getList(Object) {
  var query;

  return new Promise((resolve, reject) => {
    try {
      
      query = "SELECT " +
                "item.id, " +
                "item.name_, " +
                "item.merchantID, " +
                "merchant.name_ AS merchantname, " +
                "item.price " +
              "FROM item " +
                "LEFT JOIN merchant ON merchant.id = item.merchantID " +
              "ORDER BY item.name_";

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

//Digunakan untuk ambil data
function getInfo(merchantid, itemid) {
  var query;

  return new Promise((resolve, reject) => {
    try {
      query = "SELECT * FROM Item WHERE merchantID = " + merchantid + " AND id = " + itemid;
      
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