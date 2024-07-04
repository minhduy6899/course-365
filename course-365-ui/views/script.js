"use strict";


/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */


var gCoursesDB = {
    description: "This DB includes all courses in system",
    courses: [
        {
            id: 1,
            courseCode: "FE_WEB_ANGULAR_101",
            courseName: "How to easily create a website with Angular",
            price: 750,
            discountPrice: 600,
            duration: "3h 56m",
            level: "Beginner",
            coverImage: "images/courses/course-angular.jpg",
            teacherName: "Morris Mccoy",
            teacherPhoto: "images/teacher/morris_mccoy.jpg",
            isPopular: false,
            isTrending: true
        },
        {
            id: 2,
            courseCode: "BE_WEB_PYTHON_301",
            courseName: "The Python Course: build web application",
            price: 1050,
            discountPrice: 900,
            duration: "4h 30m",
            level: "Advanced",
            coverImage: "images/courses/course-python.jpg",
            teacherName: "Claire Robertson",
            teacherPhoto: "images/teacher/claire_robertson.jpg",
            isPopular: false,
            isTrending: true
        },
        {
            id: 5,
            courseCode: "FE_WEB_GRAPHQL_104",
            courseName: "GraphQL: introduction to graphQL for beginners",
            price: 850,
            discountPrice: 650,
            duration: "2h 15m",
            level: "Intermediate",
            coverImage: "images/courses/course-graphql.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: false
        },
        {
            id: 6,
            courseCode: "FE_WEB_JS_210",
            courseName: "Getting Started with JavaScript",
            price: 550,
            discountPrice: 300,
            duration: "3h 34m",
            level: "Beginner",
            coverImage: "images/courses/course-javascript.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 8,
            courseCode: "FE_WEB_CSS_111",
            courseName: "CSS: ultimate CSS course from beginner to advanced",
            price: 750,
            discountPrice: 600,
            duration: "3h 56m",
            level: "Beginner",
            coverImage: "images/courses/course-javascript.jpg",
            teacherName: "Juanita Bell",
            teacherPhoto: "images/teacher/juanita_bell.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 14,
            courseCode: "FE_WEB_WORDPRESS_111",
            courseName: "Complete Wordpress themes & plugins",
            price: 1050,
            discountPrice: 900,
            duration: "4h 30m",
            level: "Advanced",
            coverImage: "images/courses/course-wordpress.jpg",
            teacherName: "Clevaio Simon",
            teacherPhoto: "images/teacher/clevaio_simon.jpg",
            isPopular: true,
            isTrending: false
        }
    ]
}
// Biến mảng hằng số chứa danh sách tên các thuộc tính
const gCOURSES_COLS = [
    "id",
    "courseCode",
    "courseName",
    "price",
    "discountPrice",
    "duration",
    "level",
    "coverImage",
    "teacherName",
    "teacherPhoto",
    "Action"
];

// Biến mảng toàn cục định nghĩa chỉ số các cột tương ứng
const gCOURSE_ID_COL = 0;
const gCOURSE_COURSE_CODE_COL = 1;
const gCOURSE_COURSE_NAME_COL = 2;
const gCOURSE_PRICE_COL = 3;
const gCOURSE_DISCOUNT_PRICE_COL = 4;
const gCOURSE_DURATION_COL = 5;
const gCOURSE_LEVEL_COL = 6;
const gCOURSE_COVER_IMAGE_COL = 7;
const gCOURSE_TEACHER_NAME_COL = 8;
const gCOURSE_TEACHER_PHOTO_COL = 9;
const gCOURSE_ACTION_COL = 10;


// Biến toàn cục để hiển lưu STT
var gSTT = 1;

// Biến global voucher id
var gCourseId = '';

// Biến global input Course Array
let inputCourseArr = []

// Khai báo DataTable & mapping collumns
var gCourseTable = $("#table-courses").DataTable({
    columns: [
        { data: gCOURSES_COLS[gCOURSE_ID_COL] },
        { data: gCOURSES_COLS[gCOURSE_COURSE_CODE_COL] },
        { data: gCOURSES_COLS[gCOURSE_COURSE_NAME_COL] },
        { data: gCOURSES_COLS[gCOURSE_PRICE_COL] },
        { data: gCOURSES_COLS[gCOURSE_DISCOUNT_PRICE_COL] },
        { data: gCOURSES_COLS[gCOURSE_DURATION_COL] },
        { data: gCOURSES_COLS[gCOURSE_LEVEL_COL] },
        { data: gCOURSES_COLS[gCOURSE_COVER_IMAGE_COL] },
        { data: gCOURSES_COLS[gCOURSE_TEACHER_NAME_COL] },
        { data: gCOURSES_COLS[gCOURSE_TEACHER_PHOTO_COL] },
        { data: gCOURSES_COLS[gCOURSE_ACTION_COL] },

    ],
    columnDefs: [
        { // định nghĩa lại cột action
            targets: gCOURSE_COVER_IMAGE_COL,
            render: function (src) {
                return `<img class="" src="${src}" style="width: 100px;cursor:pointer;">`
            }
        },
        { // định nghĩa lại cột action
            targets: gCOURSE_TEACHER_PHOTO_COL,
            render: function (src) {
                return `<img class="" src="${src}" style="width: 100px;cursor:pointer;">`
            }
        },
        { // định nghĩa lại cột action
            targets: gCOURSE_ACTION_COL,
            defaultContent: `
      <img class="edit-user" src="https://cdn0.iconfinder.com/data/icons/glyphpack/45/edit-alt-512.png" style="width: 20px;cursor:pointer;">
      <img class="delete-user" src="https://cdn4.iconfinder.com/data/icons/complete-common-version-6-4/1024/trash-512.png" style="width: 20px;cursor:pointer;">
    `
        }
    ]
});


/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */


$(document).ready(function () {
    // lọc các kháo học thuộc popular
    var vMostPopularCourses = gCoursesDB.courses.filter(item => {
        return item.isPopular == true
    })

    // Lọc các khóa học thuộc trending
    var vTrendingCourses = gCoursesDB.courses.filter(item => {
        return item.isTrending == true
    })

    // gọi hàm render khóa học ra giao diện
    loadCourse(vMostPopularCourses, '.most-popular-card');
    loadCourse(vTrendingCourses, '.trending-cards');

    // thêm sự kiện khi click nút thêm 
    $('#btn-adduser').on('click', function (e) {
        onBtnAddUserClick()
    })

    // thêm sụ kiện khi click nút insert
    $('#btn-insert-user').on('click', function (e) {
        onBtnInsertClick()
    })

    // thêm sự kiện click cho nút update 
    $('#table-courses').on('click', '.edit-user', function (e) {
        onBtnSuaClick(this)
    })

    // thêm sự kiện click nút update trong modal undate
    $('#btn-update-user').on('click', function (e) {
        onBtnUpdateUserClick()
    })

    // thêm sự kiện cho nút delete
    $('#table-courses').on('click', '.delete-user', function (e) {
        onBtnXoaClick(this)
    })

    // them sự kiện click cho nút confirm modal delete
    $('#btn-confirm-delete-voucher').on('click', function () {
        onBtnConfirmDeleteClick()
    })
})


/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */


// hàm thực thi khi trang được load
function onPageLoading() {
    loadDataToCourseTable();
}

// hàm xử lý ấn nút thêm user
function onBtnAddUserClick() {
    $('#insert-user-modal').modal('show');
}

// hàm xử lý ấn nút insert thêm trên modal
function onBtnInsertClick() {
    var vCourseObj = {
        id: getNextId(),
        courseCode: "",
        courseName: "",
        price: 0,
        discountPrice: 0,
        duration: "",
        level: "",
        coverImage: "",
        teacherName: "",
        teacherPhoto: "",
        isPopular: false,
        isTrending: true
    }
    // lấy dữ liệu từ form
    var vCourseInpObject = getInputCourse(vCourseObj)
    // kiểm tra dữ liệu
    var vcheckInpCourse = checkInputCourse(vCourseObj)
    if (vcheckInpCourse) {
        // call Api update user
        insertCourse(vCourseObj)
        // Làm rỗng + Ẩn modal insert
        resetInsertModal()
    }
}

// hàm xử lý ấn nút sửa
function onBtnSuaClick(paramElement) {
    var vCourseId = $(paramElement).closest('tr').find('td:eq(0)').html()
    gCourseId = vCourseId
    var vTableRow = $(paramElement).parents("tr");
    var vVoucherRowData = gCourseTable.row(vTableRow).data();
    console.log('Khi nhấn nút sửa: ' + vCourseId);
    // hiện modal
    $('#edit-user-modal').modal('show');

    // Load giá trị vào input
    loadDataUserToInput(vVoucherRowData)

}

// hàm xử lý ấn nút update trên modal
function onBtnUpdateUserClick() {
    var vCourseObj = {
        id: gCourseId,
        courseCode: "",
        courseName: "",
        price: 0,
        discountPrice: 0,
        duration: "",
        level: "",
        coverImage: "",
        teacherName: "",
        teacherPhoto: "",
        isPopular: false,
        isTrending: true
    }
    // Lấy giá trị cần thay đổi
    var vCourseDataObj = getInputCourseData(vCourseObj)
    console.log(vCourseObj);
    // Kiểm tra
    var vCheckInpDataCourse = checkInputCourse(vCourseObj)
    if (vCheckInpDataCourse) {
        alert('Dữ liệu hợp lệ')
        // Call Api update
        updateUser(vCourseObj, gCourseId)
        // reset lại modal
        resetUpdateModal()
    }
}

// hàm xử lý án nút xóa
function onBtnXoaClick(paramElement) {
    var vCourseId = $(paramElement).closest('tr').find('td:eq(0)').html()
    gCourseId = vCourseId
    console.log('Khi nhấn nút xóa: ' + vCourseId);
    // hiện confrim modal
    $('#delete-confirm-modal').modal('show');

}

// hàm xử lý ấn nút confirm xóa trên modal
function onBtnConfirmDeleteClick() {
    alert('Đã xóa thành công')
    // call Api xóa user
    deleteUser(gCourseId);
    // tắt bảng modal
    $('#delete-confirm-modal').modal('hide');
    // render data course ra table
    loadDataToCourseTable()
}


/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/


// Hàm render khóa học ra giao diện
function loadCourse(paramCheckCourse, paramElement) {
    for (let bI = 0; bI < paramCheckCourse.length; bI++) {

        $(paramElement).append(
            `<div class="card card-item card-items mt-4">
            <img class="card-img-top" src="${paramCheckCourse[bI].coverImage}" alt="Card image cap">
            <div class="card-body">
            <a class="card-title">${paramCheckCourse[bI].courseName}</a>
            <p class="card-text" style="margin-top: 1rem"><i class="fa-regular fa-clock"></i>&nbsp; ${paramCheckCourse[bI].duration} ${paramCheckCourse[bI].level}
            </p>
            <p class="card-text"><b>${paramCheckCourse[bI].discountPrice} </b><del class="text-secondary">${paramCheckCourse[bI].price}</del></p>
            </div>
            <div class="card-footer" style="display: flex; flex-direction: row; align-items: center;">
            <img class=".rounded-circle" style="height: 36px; border-radius: 50%;"
                src="${paramCheckCourse[bI].teacherPhoto}" alt="">
            <small class="text-muted" style="margin-right: auto; padding-left: 10px;">&nbsp;${paramCheckCourse[bI].teacherName}</small>
            <i class="fa-regular fa-bookmark"></i>
            </div>
        </div>`
        )


    }
}

// Hàm gọi API Load all users
function loadDataToCourseTable(paramCourseArr) {
    gSTT = 1;
    gCourseTable.clear();
    gCourseTable.rows.add(gCoursesDB.courses);
    gCourseTable.draw();
}

// hàm lấy dữ liệu từ input insert modal
function getInputCourse(paramCourseObj) {
    $('input[name="inp-add-course"]').each(function (index, elements) {
        inputCourseArr.push(elements.value)
    })

    paramCourseObj.courseCode = inputCourseArr[0]
    paramCourseObj.courseName = inputCourseArr[1]
    paramCourseObj.price = inputCourseArr[2]
    paramCourseObj.discountPrice = inputCourseArr[3]
    paramCourseObj.duration = inputCourseArr[4]
    paramCourseObj.level = inputCourseArr[5]
    paramCourseObj.coverImage = inputCourseArr[6]
    paramCourseObj.teacherName = inputCourseArr[7]
    paramCourseObj.teacherPhoto = inputCourseArr[8]
    paramCourseObj.isPopular = inputCourseArr[9]
    paramCourseObj.isTrending = inputCourseArr[10]

    return paramCourseObj
}

// hàm sinh ra đc id tự tăng tiếp theo, dùng khi Thêm mới phần tử
function getNextId() {
    var vNextId = 0;
    // Nếu mảng chưa có đối tượng nào thì Id = 1
    if (gCoursesDB.courses.length == 0) {
        vNextId = 1;
    }
    // Id tiếp theo bằng Id của phần tử cuối cùng + thêm 1    
    else {
        vNextId = gCoursesDB.courses[gCoursesDB.courses.length - 1].id + 1;
    }
    return vNextId;
}

// hàm kiểm tra input form insert
function checkInputCourse(paramCourseObj) {
    for (const key in paramCourseObj) {
        if (paramCourseObj.hasOwnProperty.call(paramCourseObj, key)) {
            if (paramCourseObj[key] == '') {
                alert('Bạn chưa nhập đầy đủ dữ liệu')
                return false
            }
            else {
                return true
            }
        }
    }
}

// hàm call Api update user
function insertCourse(paramCourseObj) {
    // Thêm courses mời vào mảng
    gCoursesDB.courses.push(paramCourseObj)
    // render ra table
    loadDataToCourseTable()
}

// hàm reset insert modal
function resetInsertModal() {
    // ẩn modal
    $('#insert-user-modal').modal('hide')

    // reset input
    $('input[name="inp-add-course"]').val('')
}

// hàm load giá trị vào ô input
function loadDataUserToInput(paramDataRowObj) {
    var vInputUpdate = document.querySelectorAll('input[name="inp-update-course"]')
    vInputUpdate[0].value = paramDataRowObj.courseCode
    vInputUpdate[1].value = paramDataRowObj.courseName
    vInputUpdate[2].value = paramDataRowObj.price
    vInputUpdate[3].value = paramDataRowObj.discountPrice
    vInputUpdate[4].value = paramDataRowObj.duration
    vInputUpdate[5].value = paramDataRowObj.level
    vInputUpdate[6].value = paramDataRowObj.coverImage
    vInputUpdate[7].value = paramDataRowObj.teacherName
    vInputUpdate[8].value = paramDataRowObj.teacherPhoto
    vInputUpdate[9].value = paramDataRowObj.isPopular
    vInputUpdate[10].value = paramDataRowObj.isTrending
}

// hàm lấy giá trị nhập vào form update
function getInputCourseData(paramCourseObj) {
    let inputCourseUpdateArr = []
    $('input[name="inp-update-course"]').each(function (index, elements) {
        inputCourseUpdateArr.push(elements.value)
    })

    paramCourseObj.courseCode = inputCourseUpdateArr[0]
    paramCourseObj.courseName = inputCourseUpdateArr[1]
    paramCourseObj.price = inputCourseUpdateArr[2]
    paramCourseObj.discountPrice = inputCourseUpdateArr[3]
    paramCourseObj.duration = inputCourseUpdateArr[4]
    paramCourseObj.level = inputCourseUpdateArr[5]
    paramCourseObj.coverImage = inputCourseUpdateArr[6]
    paramCourseObj.teacherName = inputCourseUpdateArr[7]
    paramCourseObj.teacherPhoto = inputCourseUpdateArr[8]
    paramCourseObj.isPopular = inputCourseUpdateArr[9]
    paramCourseObj.isTrending = inputCourseUpdateArr[10]

    return paramCourseObj
}

// hàm update user bằng id 
function updateUser(paramDataUserObj, paramUserId) {
    // Gán giá trị mới cho Course Data
    for (let bI = 0; bI < gCoursesDB.courses.length; bI++) {
        if (paramUserId == gCoursesDB.courses[bI].id) {
            gCoursesDB.courses[bI].courseCode = paramDataUserObj.courseCode
            gCoursesDB.courses[bI].courseName = paramDataUserObj.courseName
            gCoursesDB.courses[bI].price = paramDataUserObj.price
            gCoursesDB.courses[bI].discountPrice = paramDataUserObj.discountPrice
            gCoursesDB.courses[bI].duration = paramDataUserObj.duration
            gCoursesDB.courses[bI].level = paramDataUserObj.level
            gCoursesDB.courses[bI].coverImage = paramDataUserObj.coverImage
            gCoursesDB.courses[bI].teacherName = paramDataUserObj.teacherName
            gCoursesDB.courses[bI].teacherPhoto = paramDataUserObj.teacherPhoto
            gCoursesDB.courses[bI].isPopular = paramDataUserObj.isPopular
            gCoursesDB.courses[bI].isTrending = paramDataUserObj.isTrending
        }

    }
    // render data course ra table
    loadDataToCourseTable()
}

// hàm reset insert modal
function resetUpdateModal() {
    // làm trăng modal
    var vInputUpdate = document.querySelectorAll('input[name="inp-update-course"]')
    vInputUpdate[0].value = ''
    vInputUpdate[1].value = ''
    vInputUpdate[2].value = ''
    vInputUpdate[3].value = ''
    vInputUpdate[4].value = ''
    vInputUpdate[5].value = ''
    vInputUpdate[6].value = ''
    vInputUpdate[7].value = ''
    vInputUpdate[8].value = ''
    vInputUpdate[9].value = ''
    vInputUpdate[10].value = ''

    // ẩn modal
    $('#edit-user-modal').modal('hide')

    // load lại trang
    // location.reload(true)
}

// hàm xóa user
function deleteUser(paramUserId) {
    // Xóa phần tử ra khỏi data
    for (let bI = 0; bI < gCoursesDB.courses.length; bI++) {
        if (paramUserId == gCoursesDB.courses[bI].id) {
            gCoursesDB.courses.splice(bI, 1)
        }

    }
}


