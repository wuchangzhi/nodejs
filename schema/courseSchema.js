/**
 * Created by ckt on 15-12-25.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseSchema =new mongoose.Schema({
	courseName : {type : String,required : true},
	score : Number,
	userId : {type:Schema.Types.ObjectId,ref:'user'}
});

module.exports = CourseSchema;