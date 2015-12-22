/**
 * Created by ckt on 15-12-11.
 */
var mongoose = require('mongoose');

module.exports =  mongoose.Schema({
	name : {type : String,required : true},
	age : Number,
	email : String
});