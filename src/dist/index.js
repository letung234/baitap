"use strict";
exports.__esModule = true;
var express_1 = require("express");
var database_service_1 = require("./services/database.service");
var index_route_1 = require("./routes/index.route");
var index_route_api_1 = require("./routes/api/index.route.api");
var express_session_1 = require("express-session");
var express_flash_1 = require("express-flash");
var cookie_parser_1 = require("cookie-parser");
var body_parser_1 = require("body-parser");
var method_override_1 = require("method-override");
var path_1 = require("path");
var moment = require("moment");
var dir_1 = require("~/constants/dir");
var error_middleware_1 = require("~/middlewares/error.middleware");
var config_1 = require("~/constants/config");
var file_1 = require("./utils/file");
var authenticateToken_1 = require("~/middlewares/authenticateToken");
file_1.initFolder();
// Kết nối với cơ sở dữ liệu
database_service_1["default"].connect();
// Khởi tạo ứng dụng Express
var app = express_1["default"]();
app.locals.moment = moment;
// Tạo ra 1 các biến cục bộ
app.locals.moment = moment;
app.locals.prefixAdmin = dir_1.PATH_ADMIN;
// Đặt cổng từ biến môi trường hoặc mặc định là 3000
var port = config_1.envConfig.port || 4000;
// Sử dụng cookieParser
app.use(cookie_parser_1["default"](config_1.envConfig.sessionCookieKey));
// Sử dụng session với thời gian sống của cookie là 60000ms
app.use(express_session_1["default"]({
    secret: config_1.envConfig.sessionCookieKey,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
// Sử dụng method-override để ghi đè phương thức HTTP
app.use(method_override_1["default"]('_method'));
// Sử dụng flash để quản lý flash messages
app.use(express_flash_1["default"]());
// Cấu hình middleware để phân tích dữ liệu form
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(body_parser_1["default"].json());
// Cấu hình views và static files
app.set('views', path_1["default"].join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express_1["default"].static(path_1["default"].join(__dirname, 'public')));
// Routes
index_route_1["default"](app);
index_route_api_1["default"](app);
// Route trang chủ
app.get('/', authenticateToken_1["default"], function (req, res) {
    res.render('pages/home', {
        pageTitle: 'Trang chủ'
    });
});
// Route 404
app.use(function (req, res) {
    res.status(404).render('pages/error/404', {
        pageTitle: '404 Not Found'
    });
});
app.use(error_middleware_1.defaultErrorHandler);
// Bắt đầu server và lắng nghe trên cổng đã xác định
app.listen(port, function () {
    console.log("Server is running on port " + port);
});
