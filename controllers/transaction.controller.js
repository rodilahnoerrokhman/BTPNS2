//fungsi convert tanggal
var moment = require('moment'); // require

var response = require('../res');
var usermodel = require('../models/user.model');
var merchantmodel = require('../models/merchant.model');
var itemmodel = require('../models/item.model');
var transactionModel = require('../models/transaction.model');

exports.process = function(req, res) {
  _process(req, res);
};

exports.getList = function(req, res) {
  _getList(req, res);
};

exports.getInfo = function(req, res) {
  _getInfo(req, res);
};

exports.view = function(req, res) {
  _view(req, res);
};

exports.search = function(req, res) {
  _search(req, res);
};

//dianggap seperti halaman login
//langsung set session untuk user id yg bersangkutan
async function _search(req, res) {
  req.session.itemName = req.body.itemName;
  req.session.merchantName = req.body.merchantName;
  req.session.dateStart = req.body.dateStart;
  req.session.dateEnd = req.body.dateEnd;
  
  response.ok("", true, res);
}

async function _view(req, res) {
  var ErrorMsg = "";
  var transactionList = "";
  var UserInfo = "";

  var User = req.session.userId;
  var itemName = req.session.itemName;
  var merchantName = req.session.merchantName;
  var dateStart = req.session.dateStart;
  var dateEnd = req.session.dateEnd;

  var TransactionBean;

  if(User) {
    UserInfo = await usermodel.getInfo(User);
    if(UserInfo=="") ErrorMsg = "User tidak ditemukan";
  }
  
  //Melengkapai parameter
  TransactionBean = new Object();
  if(ErrorMsg == "") {

    if(User) TransactionBean.User = User;

    if(dateStart) {
      TransactionBean.dateStart = dateStart + " 00:00:00";
    }
    if(dateEnd) {
      TransactionBean.dateEnd = dateEnd + " 23:59:59";
    }

    if(itemName) TransactionBean.itemName = itemName;
    if(merchantName) TransactionBean.merchantName = merchantName;

    if(typeof User !== "undefined") {
      transactionList = await transactionModel.getList(TransactionBean);
      if(transactionList=="") ErrorMsg = "Transaksi tidak ditemukan";
    }
  }

  var sess = req.session;
  
  res.render("./transaction/list", {
    transactionList,
    ErrorMsg,
    UserInfo,
    sess,
    title: "TRANSAKSI", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
  });
}

async function _process(req, res) {
  var parameter = req.body;

  var User = parameter.user;
  if(User=="" || !User) User = req.session.userId;

  var Item = parameter.item;
  var Merchant = parameter.merchant;
  var ErrorMsg = "";

  var UserInfo;
  var MerchantInfo;
  var ItemInfo;
  
  var UserBean;
  var MerchantBean;
  var TransactionBean;
   
  //Cek parameter
  if(User=="" || !User) ErrorMsg = "User tidak boleh Kosong";
  if(Item=="" || !Item) ErrorMsg = "Item tidak boleh Kosong";
  if(Merchant=="" || !Merchant) ErrorMsg = "Merchant tidak boleh Kosong";

  //cek apakah user terdaftar
  if(ErrorMsg == "") {
    UserInfo = await usermodel.getInfo(User);
    if(UserInfo=="") ErrorMsg = "User tidak ditemukan";
  }

  //cek apakah merchant terdaftar
  if(ErrorMsg == "") {
    MerchantInfo = await merchantmodel.getInfo(Merchant);
    if(MerchantInfo=="") ErrorMsg = "Merchant tidak ditemukan";
  }

  //cek apakah item tersebut ada untuk merchant yang dimaksud
  if(ErrorMsg == "") {
    ItemInfo = await itemmodel.getInfo(Merchant, Item);
    if(ItemInfo=="") ErrorMsg = "Item tidak ditemukan";
  }

  //Cek saldo, apakah cukup dengan item yang dibeli
  if(ErrorMsg == "") {
    if(UserInfo.Saldo < ItemInfo.price) ErrorMsg = "Saldo tidak mencukupi";
  }

  //Melanjutkan proses transaksi, simpan ke table transaksi
  TransactionBean = new Object();
  if(ErrorMsg == "") {
    TransactionBean.userID = User;
    TransactionBean.merchantID = Merchant;
    TransactionBean.itemID = Item;
    TransactionBean.price = ItemInfo.price;
    TransactionBean.note = "Pembayaran untuk item " + ItemInfo.name_;

    ErrorMsg = await transactionModel.insert(TransactionBean);
  }

  //Melanjutkan proses transaksi, update saldo merchant
  if(ErrorMsg == "") {
    MerchantBean = new Object();
    MerchantBean.id = Merchant;
    MerchantBean.Saldo = ItemInfo.price;

    ErrorMsg = await merchantmodel.updateSaldo(MerchantBean);
  }

  //Melanjutkan proses transaksi, update saldo user
  if(ErrorMsg == "") {
    UserBean = new Object();
    UserBean.id = User;
    UserBean.Saldo = -ItemInfo.price;

    ErrorMsg = await usermodel.updateSaldo(UserBean);
  }

  if(ErrorMsg != "") {
    console.log(ErrorMsg);
    response.ok(ErrorMsg, false, res);
  }
  else {
    response.ok(parameter, true, res);
  }
}

async function _getList(req, res) {
  var parameter = req.body;
  var ErrorMsg = "";
  
  var User = parameter.user;
  if(User=="" || !User) User = req.session.userId;

  var dateStart = parameter.dateStart;
  var dateEnd = parameter.dateEnd;
  var item = parameter.item;
  var merchant = parameter.merchant;
  var itemName = parameter.itemName;
  var merchantName = parameter.merchantName;

  var TransactionBean;
  var TransactionInfo;

  //Cek parameter
  if(dateStart)
    if(!ValidateDate(dateStart)) ErrorMsg = "Taggal, format tidak sesuai (yyyy-mm-dd)";
  if(dateEnd)
    if(!ValidateDate(dateEnd)) ErrorMsg = "Taggal, format tidak sesuai (yyyy-mm-dd)";
  
  //Melengkapai parameter
  TransactionBean = new Object();
  if(ErrorMsg == "") {

    if(User) TransactionBean.User = User;
    if(dateStart) {
      TransactionBean.dateStart = dateStart + " 00:00:00";
    }
    if(dateEnd) {
      TransactionBean.dateEnd = dateEnd + " 23:59:59";
    }
    if(item) TransactionBean.item = item;
    if(merchant) TransactionBean.merchant = merchant;
    if(itemName) TransactionBean.itemName = itemName;
    if(merchantName) TransactionBean.merchantName = merchantName;

    TransactionInfo = await transactionModel.getList(TransactionBean);
  }

  if(ErrorMsg != "") {
    console.log(ErrorMsg);
    response.ok(ErrorMsg, false, res);
  }
  else {
    response.ok(TransactionInfo, true, res);
  }
}

async function _getInfo(req, res) {
  var id = req.params.id;
  var TransactionBean;
  var TransactionInfo;
  var ErrorMsg = "";

  if(id=="" || !id) ErrorMsg = "id tidak boleh Kosong";
  
  //Melengkapai parameter
  TransactionBean = new Object();
  if(ErrorMsg == "") {
    TransactionBean.id = id;
    TransactionInfo = await transactionModel.getList(TransactionBean);
  }

  if(ErrorMsg != "") {
    console.log(ErrorMsg);
    response.ok(ErrorMsg, false, res);
  }
  else {
    response.ok(TransactionInfo, true, res);
  }
}

function ValidateDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;  // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0,10) === dateString;
  /*
  const regExp = /^(\d\d?)\/(\d\d?)\/(\d{4})$/;
  let maxDate = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let matches;
  let isValid = false;

  try {
    matches = dateStr.match(regExp);
    isValid = matches;
    
    if (matches) {
      const month = parseInt(matches[2]);
      const date = parseInt(matches[1]);
      const year = parseInt(matches[3]);
      
      isValid = month <= 12 && month > 0;
      isValid &= date <= maxDate[month] && date > 0;
      
      const leapYear = (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
      isValid &= month != 2 || leapYear || date <= 28; 
    }
    
    return isValid;
  }
  catch (error) {
    return isValid;
  }*/
}

function Str2Date(dateStr) {
  //var dateString = "23/10/2015"; // Oct 23
  var dateMomentObject = moment(dateStr, "DD/MM/YYYY HH:mm:ss"); // 1st argument - string, 2nd argument - format
  return dateMomentObject.toDate();
}