var response = require('../res');
var merchantmodel = require('../models/merchant.model');

exports.view = function(req, res) {
  _view(req, res);
};

async function _view(req, res) {
  var ErrorMsg = "";

  var MerchantList;

  //Ambil data user
  MerchantList = await merchantmodel.getList();
  if(MerchantList === "") ErrorMsg = "Merchant tidak ditemukan";
  
  res.render("./merchant/list", {
    MerchantList,
    ErrorMsg,
    title: "LIST", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
  });

  res.render("./merchant", {
    MerchantList,
    ErrorMsg,
    title: "LIST", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
  });
}

