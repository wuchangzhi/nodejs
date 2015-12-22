var express = require('express');
var UserModel = require('../model/userModel');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.render('showdetail',{"_layoutFile":false});
});

router.post("/data/",function(req,res){
	var name = req.body.name;
	var sort = req.body.sort;
	var order = req.body.order =='asc' ? 1 : -1;

	UserModel.findAll(sort,order,function(err,users){
		var begin = (req.body.page - 1) * req.body.rows;
		var end = req.body.page * req.body.rows;

		var results = {};
		var users_filter = users.filter(function(element,pos){
			if(name == undefined){
				return true;
			}
			return element.name.indexOf(name) > -1;
		});

		results.total = users_filter.length;

		results.rows = users_filter.slice(begin,end);
		return res.json(results);

	});
	return null;
});

router.post("/data/save",function(req,res){
	console.log(req.body._id);
	var id = req.body._id;
	if(id != null){
		delete req.body._id;
		console.log(req.body);
		UserModel.UserModel.update({_id:id},req.body,function(err,data){
			console.log(data);
			res.send(data);
		});
	} else {
		var user = new UserModel.UserModel(req.body);
		user.save(function(err,data){
			res.send(data);
		});
	}
});

router.post("/data/delete",function(req,res) {
	var ids = req.body.ids.split(",");
	console.log(ids);
	UserModel.remove(ids,function(data){
		console.log(data);
		res.send(data);
	});
});


router.get('/remove', function (req, res, next) {
	var index = req.query.index;
	users.splice(index,1);
	res.render('showdetail',{"_layoutFile":false});
});

module.exports = router;
