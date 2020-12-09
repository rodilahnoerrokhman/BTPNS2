//fungsi convert tanggal
var moment = require('moment'); // require

var response = require('../res');
var itemmodel = require('../models/item.model');

exports.setSession = function(req, res) {
  _setSession(req, res);
};

exports.clearSession = function(req, res) {
  _clearSession(req, res);
};

//dianggap seperti halaman login
//langsung set session untuk user id yg bersangkutan
async function _setSession(req, res) {
  var User = req.params.user;
  req.session.userId = User;
  res.redirect('/item');
}

async function _clearSession(req, res) {
  req.session.destroy();
  res.redirect('/user');
}