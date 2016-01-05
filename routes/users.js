var express = require('express');
var UserModel = require('../model/userModel');
var CourseModel = require('../model/courseModel');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.render('showdetail');
});

router.post("/data/", function (req, res) {
	var name = req.body.name;
	var sort = req.body.sort;
	var order = req.body.order == 'asc' ? 1 : -1;

	UserModel.findAll(sort, order, function (err, users) {
		var begin = (req.body.page - 1) * req.body.rows;
		var end = req.body.page * req.body.rows;
		var results = {};
		var users_filter = users.filter(function (element, pos) {
			if (name == undefined) {
				return true;
			}
			return element.name.indexOf(name) > -1;
		});

		results.total = users_filter.length;

		results.rows = users_filter.slice(begin, end);
		return res.json(results);

	});
	return null;
});

router.post("/data/save", function (req, res, next) {
	console.log(req.body._id);
	var id = req.body._id;
	if (id != null) {
		delete req.body._id;
		console.log(req.body);
		UserModel.UserModel.update({_id: id}, req.body, function (err, data) {
			if (err) {
				console.log(err);
				return next(err);
			}
			res.send(data);
		});
	} else {
		var user = new UserModel.UserModel(req.body);
		user.save(function (err, data) {
			if (err) {
				//err.status = 304;
				return next(err);
			}
			res.send(data);
		});
	}
});

router.post("/test", function (req, res) {
	var id = req.body.id;
	delete req.body.id;
	console.log(req.body);
	UserModel.UserModel.update({_id: id}, req.body, function (err, data) {
		if (err) {
			console.log(err);
			return next(err);
		}
		UserModel.UserModel.findOne({_id:id}, function (err, user) {
			res.send(user);
		});
	});
	//res.send(req.body);
});

router.get("/userdetail/:id", function (req, res) {
	var id = req.params.id;
	res.render('main', {id: id});
});

router.get("/showdetail/:id", function (req, res) {
	UserModel.getUserById(req.params.id, function (err, user) {
		res.render('detail', {user: user});
	});
});

router.get("/likes/:id", function (req, res) {

	res.render('likes');
});

router.post("/data/delete", function (req, res) {
	var ids = req.body.ids.split(",");
	console.log(ids);
	UserModel.remove(ids, function (data) {
		res.send(data);
	});
});

router.post("/courseData/:id", function (req, res) {
	var query = {};
	if (!(req.body.courseName == undefined || req.body.courseName == "")) {
		query.courseName = req.body.courseName;
	}
	CourseModel.findByCourse(req.params.id, query, function (err, datas) {
		var begin = (req.body.page - 1) * req.body.rows;
		var end = req.body.page * req.body.rows;

		var results = {};
		var items = [];

		datas.forEach(function (data) {
			var item = {};
			item.name = data.userId.name;
			item.courseName = data.courseName;
			item.score = data.score;
			items.push(item);

		});
		results.total = items.length;
		results.rows = items.slice(begin, end);

		return res.json(results);
	});
	return null;
});


module.exports = router;
