import express, { Request, Response } from 'express'
import databaseService from './services/database.service'
import Routes from './routes/index.route'
import ApiRoutes from './routes/api/index.route.api'
import session from 'express-session'
import flash from 'express-flash'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import path from 'path'
import * as moment from 'moment'
import { PATH_ADMIN } from '~/constants/dir'
import { defaultErrorHandler } from '~/middlewares/error.middleware'
import { envConfig } from '~/constants/config'
import authenticateToken from '~/middlewares/authenticateToken'

// Kết nối với cơ sở dữ liệu
databaseService.connect()

// Khởi tạo ứng dụng Express
const app = express()

app.locals.moment = moment
// Tạo ra 1 các biến cục bộ
app.locals.moment = moment
app.locals.prefixAdmin = PATH_ADMIN

// Đặt cổng từ biến môi trường hoặc mặc định là 3000
const port = envConfig.port || 4000

// Sử dụng cookieParser
app.use(cookieParser(envConfig.sessionCookieKey))

// Sử dụng session với thời gian sống của cookie là 60000ms
app.use(
  session({
    secret: envConfig.sessionCookieKey,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
)

// Sử dụng method-override để ghi đè phương thức HTTP
app.use(methodOverride('_method'))

// Sử dụng flash để quản lý flash messages
app.use(flash())

// Cấu hình middleware để phân tích dữ liệu form
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Cấu hình views và static files
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

// Routes
Routes(app)
ApiRoutes(app)
// Route trang chủ
app.get('/', authenticateToken, (req: Request, res: Response) => {
  res.render('pages/home', {
    pageTitle: 'Trang chủ'
  })
})

// Route 404
app.use((req: Request, res: Response) => {
  res.status(404).render('pages/error/404', {
    pageTitle: '404 Not Found'
  })
})
app.use(defaultErrorHandler)

// Bắt đầu server và lắng nghe trên cổng đã xác định
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
