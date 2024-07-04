const courseModel = require('../model/courseModel');
//import thư viện mongoose
const mongoose = require('mongoose');
class CourseController {
  getAllCourse(req,res) {
    //B1: thu thập dữ liệu từ req
    //B2: validate dữ liệu
    //B3: Gọi model thực hiện các thao tác nghiệp vụ
    courseModel.find((error,data)=> {
      if(error) {
        return res.status(500).json({
          message: error.message
        })
      }

      return res.status(200).json({
        message: "Get all courses successfully",
        courses: data
      })
    })
  }

  createCourse(req,res){
    //B1: thu thập dữ liệu từ req
    let body = req.body;
    // console.log(body);
    //B2: validate dữ liệu
    if(!body.courseCode) {
      return res.status(400).json({
        message: 'courseCode is required!'
      })
    }
    if(!body.courseName) {
      return res.status(400).json({
        message: 'courseName is required!'
      })
    }

    if(!Number.isInteger(body.price) || body.price < 0){
      return res.status(400).json({
        message: 'price is invalid!'
      }) 
    }
    if(!Number.isInteger(body.discountPrice) || body.discountPrice < 0){
      return res.status(400).json({
        message: 'discountPrice is invalid!'
      }) 
    }
    if(!body.duration) {
      return res.status(400).json({
        message: 'duration is required!'
      })
    }
    if(!body.level) {
      return res.status(400).json({
        message: 'level is required!'
      })
    }
    if(!body.coverImage) {
      return res.status(400).json({
        message: 'coverImage is required!'
      })
    }
    if(!body.teacherName) {
      return res.status(400).json({
        message: 'teacherName is required!'
      })
    }
    if(!body.teacherPhoto) {
      return res.status(400).json({
        message: 'teacherPhoto is required!'
      })
    }
    //B3: Gọi model thực hiện các thao tác nghiệp vụ
    let newCourseData = {
      _id: mongoose.Types.ObjectId(),
      courseCode: body.courseCode,
      courseName: body.courseName,
      price: body.price,
      discountPrice: body.discountPrice,
      duration: body.duration,
      level: body.level,
      coverImage: body.coverImage,
      teacherName: body.teacherName,
      teacherPhoto: body.teacherPhoto,
      isPopular: body.isPopular,
      isTrending: body.isTrending,
    }
    courseModel.create(newCourseData, (error,data) =>{
      if(error) {
        return res.status(500).json({
          message: error.message
        })
      }

      return res.status(201).json({
        message: "Create successfully",
        newCourse: data
      })
    })
  }

  getCourseById(req,res,next){
    //B1: thu thập dữ liệu từ req
    let id = req.params.courseid;
    //B2: validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'CourseId is invalid!'
      })
    }
    //B3: Gọi model thực hiện các thao tác nghiệp vụ
    courseModel.findById(id, (error,data)=>{
      if(error) {
        return res.status(500).json({
          message: error.message
        })
      }

      return res.status(200).json({
        message: "Get course successfully",
        course: data
      })
    })
  }

  updateCourseById(req,res,next){
    //B1: thu thập dữ liệu từ req
    let id = req.params.courseid;
    let body = req.body;

    //B2: validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'CourseId is invalid!'
      })
    }
    //bóc tách trường hợp undefined
    if(body.courseCode !== undefined && body.courseCode =="") {
      return res.status(400).json({
        message: 'courseCode is required!'
      })
    }
    if(body.courseName !== undefined && body.courseName =="") {
      return res.status(400).json({
        message: 'courseName is required!'
      })
    }

    if(body.price !== undefined &&(!Number.isInteger(body.price) || body.price < 0)){
      return res.status(400).json({
        message: 'Price is invalid!'
      }) 
    }
    if(body.discountPrice !== undefined &&(!Number.isInteger(body.discountPrice) || body.discountPrice < 0)){
      return res.status(400).json({
        message: 'discountPrice is invalid!'
      }) 
    }
    if(body.duration !== undefined && body.duration =="") {
      return res.status(400).json({
        message: 'duration is required!'
      })
    }
    if(body.level !== undefined && body.level =="") {
      return res.status(400).json({
        message: 'level is required!'
      })
    }
    if(body.coverImage !== undefined && body.coverImage =="") {
      return res.status(400).json({
        message: 'coverImage is required!'
      })
    }
    if(body.teacherName !== undefined && body.teacherName =="") {
      return res.status(400).json({
        message: 'teacherName is required!'
      })
    }
    if(body.teacherPhoto !== undefined && body.teacherPhoto =="") {
      return res.status(400).json({
        message: 'teacherPhoto is required!'
      })
    }
    //B3: Gọi model thực hiện các thao tác nghiệp vụ
    let courseUpdate = {
      courseCode: body.courseCode,
      courseName: body.courseName,
      price: body.price,
      discountPrice: body.discountPrice,
      duration: body.duration,
      level: body.level,
      coverImage: body.coverImage,
      teacherName: body.teacherName,
      teacherPhoto: body.teacherPhoto,
      isPopular: body.isPopular,
      isTrending: body.isTrending,
    }
    if(body.courseCode){
      courseUpdate.courseCode = body.courseCode;
    }
    if(body.courseName){
      courseUpdate.courseName = body.courseName;
    }
    if(body.price){
      courseUpdate.price = body.price;
    }
    if(body.discountPrice){
      courseUpdate.discountPrice = body.discountPrice;
    }
    if(body.duration){
      courseUpdate.duration = body.duration;
    }
    if(body.level){
      courseUpdate.level = body.level;
    }
    if(body.coverImage){
      courseUpdate.coverImage = body.coverImage;
    }
    if(body.teacherName){
      courseUpdate.teacherName = body.teacherName;
    }
    if(body.teacherPhoto){
      courseUpdate.teacherPhoto = body.teacherPhoto;
    }
    if(body.isPopular){
      courseUpdate.isPopular = body.isPopular;
    }
    if(body.isTrending){
      courseUpdate.isTrending = body.isTrending;
    }
    

    courseModel.findByIdAndUpdate(id,courseUpdate,(error,data)=>{
      if(error) {
        return res.status(500).json({
          message: error.message
        })
      }

      return res.status(200).json({
        message: "Update course successfully",
        course: data
      })
    })
  }

  deleteCourseById(req,res,next){
    //B1: thu thập dữ liệu từ req
    let id = request.params.courseid;
    //B2: validate dữ liệu
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'CourseId is invalid!'
      })
    }
    //B3: Gọi model thực hiện các thao tác nghiệp vụ
    courseModel.findByIdAndDelete(id,(error,data)=>{
      if(error) {
        return res.status(500).json({
          message: error.message
        })
      }

      return res.status(204).json({
        message: "Delete course successfully",
        course: data
      })
    })
  }
} 
module.exports = new CourseController;