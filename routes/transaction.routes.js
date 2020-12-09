var express = require('express');
var router = express.Router();
var transactionController = require('../controllers/transaction.controller');

router.route('/add').post(transactionController.process);
router.route('/list').get(transactionController.getList);
router.route('/get/:id').get(transactionController.getInfo);
//mendapatkan semua data
router.get("/", transactionController.view); // Untuk view
//mendapatkan semua data
router.post("/search", transactionController.search); // Untuk view

module.exports = router;