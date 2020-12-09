var express = require('express');
var router = express.Router();
var itemController = require('../controllers/item.controller');

//mendapatkan semua data
router.get("/", itemController.getList); // Untuk view

module.exports = router;