const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
	// _id: {type: ObjectId, unique:true},
	courseCode: { type: String, unique: true, required: true },
	courseName: { type: String, required: true },
	price: { type: Number, required: true },
	discountPrice: { type: Number, required: true },
	duration: { type: String, required: true },
	level: { type: String, required: true },
	coverImage: { type: String, required: true },
	teacherName: { type: String, required: true },
	teacherPhoto: { type: String, required: true },
	isPopular: { type: Boolean, default: true },
	isTrending: { type: Boolean, default: false },

}, {
	timestamps: true
});

module.exports = mongoose.model('Course', Course);



