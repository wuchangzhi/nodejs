var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('layout', {title: '管理系统'});
});

module.exports = router;
