var express = require('express');
var router = express.Router();
var SessionController = require('../controllers/session.controller');

//mendapatkan semua data
router.get("/:user", SessionController.setSession); // Untuk view
router.get("/", SessionController.clearSession); // Untuk view

module.exports = router;