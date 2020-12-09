var express = require('express');
var router = express.Router();
var merchantController = require('../controllers/merchant.controller');

//mendapatkan semua data
router.get("/", merchantController.view); // Untuk view

module.exports = router;