/**
 * Created by ckt on 15-12-11.
 */
var mongoose = require('mongoose');
var UserSchema = require('../schema/userSchema');
var config = require('../config');
var eventproxy = require('eventproxy');
var ep = new eventproxy();

mongoose.connect(config.db);


var UserModel = mongoose.model('user',UserSchema);


exports.findAll = function(sort,order,callback){
	var obj = {};
	obj[sort] = order;
	UserModel.find().sort(obj).exec(callback);
};

exports.findByName = function(username , callback){
	UserModel.findOne({username:username} , callback);
};
exports.getUserById = function(id , callback){
	UserModel.findOne({_id:id},callback);
};



exports.remove = function(ids,callback){
	ep.after("remove",ids.length,callback);
	ids.forEach(function(data){
		UserModel.remove({"_id":data},function(err,data){
			ep.emit("remove",data);
		});
	});

};

exports.UserModel = UserModel;