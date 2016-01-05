/**
 * Created by ckt on 15-12-11.
 */
var mongoose = require('mongoose');
var course = require('../model/courseModel');

var UserSchema =new mongoose.Schema({
	name : {type : String,required : true},
	age : Number,
	email : String

});
UserSchema.index({name:1},{unique:true});

module.exports =UserSchema;