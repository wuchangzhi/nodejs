/**
 * Created by ckt on 15-12-25.
 */
var mongoose = require('mongoose');
var CourseSchema = require('../schema/courseSchema');

var CourseModel = mongoose.model('course',CourseSchema);

exports.findByCourse = function(id,query,callback){
	CourseModel.find({}).populate({path:'userId',match:{_id:id}}).exec(function(err,datas){
		callback(err,
			datas.filter(function(data) {
				return data.userId != null;
			}));
	});
};

exports.CourseModel = CourseModel;