"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_service_1 = __importDefault(require("./services/database.service"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const index_route_api_1 = __importDefault(require("./routes/api/index.route.api"));
const express_session_1 = __importDefault(require("express-session"));
const express_flash_1 = __importDefault(require("express-flash"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const method_override_1 = __importDefault(require("method-override"));
const path_1 = __importDefault(require("path"));
const moment = __importStar(require("moment"));
const dir_1 = require("./constants/dir");
const error_middleware_1 = require("./middlewares/error.middleware");
const config_1 = require("./constants/config");
const file_1 = require("./utils/file");
const authenticateToken_1 = __importDefault(require("./middlewares/authenticateToken"));
(0, file_1.initFolder)();
database_service_1.default.connect();
const app = (0, express_1.default)();
app.locals.moment = moment;
app.locals.moment = moment;
app.locals.prefixAdmin = dir_1.PATH_ADMIN;
const port = config_1.envConfig.port || 4000;
app.use((0, cookie_parser_1.default)(config_1.envConfig.sessionCookieKey));
app.use((0, express_session_1.default)({
    secret: config_1.envConfig.sessionCookieKey,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use((0, method_override_1.default)('_method'));
app.use((0, express_flash_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
(0, index_route_1.default)(app);
(0, index_route_api_1.default)(app);
app.get('/', authenticateToken_1.default, (req, res) => {
    res.render('pages/home', {
        pageTitle: 'Trang chủ'
    });
});
app.use((req, res) => {
    res.status(404).render('pages/error/404', {
        pageTitle: '404 Not Found'
    });
});
app.use(error_middleware_1.defaultErrorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
