var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller');

router.route('/addsaldo').post(userController.addSaldo);
//mendapatkan semua data user
router.get("/", userController.viewUser); // Untuk view

module.exports = router;
