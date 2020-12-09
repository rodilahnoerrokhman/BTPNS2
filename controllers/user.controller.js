var response = require('../res');
var usermodel = require('../models/user.model');

exports.addSaldo = function(req, res) {
  _addSaldo(req, res);
};

exports.viewUser = function(req, res) {
  _viewUser(req, res);
};

async function _viewUser(req, res) {
  var ErrorMsg = "";

  var UserList;

  //Ambil data user
  UserList = await usermodel.getList();
  if(UserList=="") ErrorMsg = "User tidak ditemukan";
  
  res.render("./user/list", {
    UserList,
    ErrorMsg,
    title: "CRUD", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
  });
}

async function _addSaldo(req, res) {
  var parameter = req.body;

  var User = parameter.user;
  if(User=="" || !User) User = req.session.userId;
  
  var Value = parameter.value;
  var ErrorMsg = "";

  var UserInfo;
  var UserBean;
   
  //Cek parameter
  if(User=="" || !User) ErrorMsg = "User tidak boleh Kosong";
  if(Value=="" || !Value) ErrorMsg = "Nilai tidak boleh Kosong";

  //cek apakah user terdaftar
  if(ErrorMsg == "") {
    UserInfo = await usermodel.getInfo(User);
    if(UserInfo=="") ErrorMsg = "User tidak ditemukan";
  }

  //Mulai update saldo
  if(ErrorMsg == "") {
    UserBean = new Object();
    UserBean.id = User;
    UserBean.Saldo = Value;

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