import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'

const env = process.env.NODE_ENV || 'development'
const envFilename = `.env.${env}`

if (!fs.existsSync(path.resolve(envFilename))) {
  console.log(`Không tìm thấy file môi trường ${envFilename}`)
  console.log(`Vui lòng tạo file ${envFilename} và tham khảo nội dung ở file .env.example`)
  process.exit(1)
} else {
  console.log(`Phát hiện NODE_ENV = ${env}, app sẽ dùng file môi trường ${envFilename}`)
}

config({ path: envFilename })

export const envConfig = {
  port: process.env.PORT || 4000,
  dbName: process.env.DB_NAME as string,
  dbUsername: process.env.DB_USERNAME as string,
  dbPassword: process.env.DB_PASSWORD as string,
  sessionCookieKey: process.env.KEY_SESSION_COOKIE as string,
  cloudinary: {
    cloudName: process.env.CLOUD_NAME as string,
    apiKey: process.env.API_KEY as string,
    apiSecret: process.env.API_SECRET as string
  },
  passwordSecret: process.env.PASSWORD_SECRET as string,
  jwtSecretAccessToken: process.env.JWT_SECRET_ACCESS_TOKEN as string,
  jwtSecretRefreshToken: process.env.JWT_SECRET_REFRESH_TOKEN as string,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string
}

const requiredEnvVars = [
  'DB_NAME',
  'DB_USERNAME',
  'DB_PASSWORD',
  'KEY_SESSION_COOKIE',
  'PASSWORD_SECRET',
  'CLOUD_NAME',
  'API_KEY',
  'API_SECRET',
  'JWT_SECRET_ACCESS_TOKEN',
  'JWT_SECRET_REFRESH_TOKEN',
  'REFRESH_TOKEN_EXPIRES_IN',
  'ACCESS_TOKEN_EXPIRES_IN'
]
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`Warning: Missing environment variable ${key}`)
  }
})

export const isProduction = env === 'production'
