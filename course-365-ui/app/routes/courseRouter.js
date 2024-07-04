//khai báo thư viện express
const express = require('express');

const { courseMiddleware } = require('../middlewares/courseMiddleware');
// const course = require('../model/courseModel');
const courseController = require('../controllers/courseController');
//tạo router
const courseRouter = express.Router();


//sủ dụng middle ware
courseRouter.use(courseMiddleware);

//get all courses
courseRouter.get('/courses', courseController.getAllCourse);

//get a drink
courseRouter.get('/courses/:courseid', courseController.getCourseById);

//create a drink
courseRouter.post('/courses', courseController.createCourse);

//update a drink
courseRouter.put('/courses/:courseid', courseController.updateCourseById);

//delete a course
courseRouter.delete('/courses/:courseid', courseController.deleteCourseById);

module.exports = { courseRouter };