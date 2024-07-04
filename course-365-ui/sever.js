//khai báo thư viện express
const express = require('express');
const path = require('path');// thư viện path( quản lý tập tin trên máy)
const { courseRouter } = require('./app/routes/courseRouter');
//khởi tạo ứng dụng nodejs
const app = new express();

//sử dụng được body json
app.use(express.json());

//sử dụng body unicode
app.use(express.urlencoded({
  extended: true
}))

const db = require('./config/db');

//Connect to DB
db.connect();

//Để hiển thị ảnh cần thêm middleware static vào express
app.use(express.static(path.join(__dirname, "/views")))


//khai báo port chạy nodejs
const port = 8008;

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "/views/index.html"))
})

app.get("/course-list", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "/views/CourseList.html"))
})

app.use('/', courseRouter);
app.listen(port, () => {
  console.log(`App chạy trên cổng ${port}`);
}) 