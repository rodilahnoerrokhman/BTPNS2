var connection = require('./conn');

module.exports = {
  insert,
  getList
}

//Digunakan insert data
function insert(Object) {
  var query;

  return new Promise((resolve, reject) => {
    try {
      query = "INSERT INTO trans (" +
                "transactionDate, " +
                "userID, " +
                "merchantID, " +
                "itemID, " +
                "price, " +
                "note" +
              ") VALUES (" +
                "NOW(), " +
                Object.userID + ", " +
                Object.merchantID + ", " +
                Object.itemID + ", " +
                Object.price + ", " +
                "'" + Object.note + "'" +
              ")";
      
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

//Digunakan untuk ambil data
function getList(Object) {
  var query;
  var where = "";

  return new Promise((resolve, reject) => {
    try {
      //Menyusun kondisi
      if(Object.id) {
        if(where!="") where = where + " AND ";
        where = where + " trans.id = " + Object.id + " ";
      }

      if(Object.User) {
        if(where!="") where = where + " AND ";
        where = where + " trans.userID = " + Object.User + " ";
      }

      if(Object.dateStart) {
        if(where!="") where = where + " AND ";
        where = where + " trans.transactionDate >= '" + Object.dateStart + "' ";
      }

      if(Object.dateEnd) {
        if(where!="") where = where + " AND ";
        where = where + " trans.transactionDate <= '" + Object.dateEnd + "' ";
      }

      if(Object.item) {
        if(where!="") where = where + " AND ";
        where = where + " trans.itemID = " + Object.item + " ";
      }

      if(Object.merchant) {
        if(where!="") where = where + " AND ";
        where = where + " trans.merchantID = " + Object.merchant + " ";
      }

      if(Object.itemName) {
        if(where!="") where = where + " AND ";
        where = where + " item.name_ like '%" + Object.itemName + "%' ";
      }

      if(Object.merchantName) {
        if(where!="") where = where + " AND ";
        where = where + " merchant.name_ like '%" + Object.merchantName + "%' ";
      }
      
      query = "SELECT " +
                "trans.transactionDate, " +
                "user.name_ AS username_, " +
                "item.name_ AS itemname, " +
                "merchant.name_ AS merchantname, " +
                "trans.price, " +
                "trans.note " +
              "FROM trans " +
                "LEFT JOIN user ON user.id = trans.userID " +
                "LEFT JOIN item ON item.id = trans.itemID " +
                "LEFT JOIN merchant ON merchant.id = trans.merchantID";
      if(where!="") query = query + " WHERE " + where;

      query = query + " ORDER BY trans.transactionDate";

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