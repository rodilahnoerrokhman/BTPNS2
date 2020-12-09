//fungsi convert tanggal
var moment = require('moment'); // require

var response = require('../res');
var itemmodel = require('../models/item.model');
var usermodel = require('../models/user.model');

exports.getList = function(req, res) {
  _getList(req, res);
};

async function _getList(req, res) {
  var ErrorMsg = "";
  var UserID = req.session.userId;

  var itemList = "";
  var UserInfo = "";

  if(UserID) {
    UserInfo = await usermodel.getInfo(UserID);
    if(UserInfo=="") ErrorMsg = "User tidak ditemukan";
  }

  //Ambil data item
  if(typeof UserID !== "undefined") {
    itemList = await itemmodel.getList();
    if(itemList=="") ErrorMsg = "Item tidak ditemukan";
  }
  
  res.render("./item/list", {
    itemList,
    ErrorMsg,
    title: "LIST",
    UserInfo: UserInfo,
  });
}