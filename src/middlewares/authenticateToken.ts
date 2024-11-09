import { Request, Response, NextFunction } from 'express'
import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { verifyToken } from '~/utils/jwt'
import databaseService from '~/services/database.service'
import { MESSAGES } from '~/constants/messages'
import usersService from '~/services/users.service'
import HTTP_STATUS from '~/constants/httpStatus'

config()

const authenticateToken = async (req: Request<any, any, any, any>, res: Response, next: NextFunction) => {
  const accessToken = req.cookies?.access_token
  const refreshToken = req.cookies?.refresh_token
  const isApiRequest = req.headers.accept === 'application/json'

  if (!accessToken) {
    if (isApiRequest) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ error: 'Unauthorized', message: MESSAGES.ACCESS_TOKEN_IS_REQUIRED })
    } else {
      req.flash('error', MESSAGES.ACCESS_TOKEN_IS_REQUIRED)
      return res.redirect('/users/login')
    }
  }

  try {
    const decoded = await verifyToken({
      token: accessToken,
      secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
    })

    req.decoded_authorization = decoded
    const user = await databaseService.User.findOne({ deleted: false, _id: new ObjectId(decoded.user_id) })
    res.locals.role = await databaseService.Role.findOne({ deleted: false, _id: new ObjectId(user?.role_id) })
    return next()
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return handleExpiredAccessToken(req, res, next, refreshToken, isApiRequest)
    } else {
      if (isApiRequest) {
        return res.status(401).json({ error: 'Unauthorized', message: err.name })
      } else {
        req.flash('error', err.name)
        return res.redirect('/users/login')
      }
    }
  }
}

async function handleExpiredAccessToken(
  req: Request,
  res: Response,
  next: NextFunction,
  refreshToken: string | undefined,
  isApiRequest: boolean
) {
  if (!refreshToken) {
    if (isApiRequest) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ error: 'Unauthorized', message: MESSAGES.REFRESH_TOKEN_IS_REQUIRED })
    } else {
      req.flash('error', MESSAGES.REFRESH_TOKEN_IS_REQUIRED)
      return res.redirect('/users/login')
    }
  }

  try {
    const decoded_refresh_token = await verifyToken({
      token: refreshToken,
      secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
    })

    const found_refresh_token = await databaseService.refreshTokens.findOne({ token: refreshToken })
    if (decoded_refresh_token && found_refresh_token) {
      await refreshAccessToken(req, res, decoded_refresh_token)
      return next()
    } else {
      if (isApiRequest) {
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ error: 'Unauthorized', message: MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST })
      } else {
        req.flash('error', MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST)
        return res.redirect('/users/login')
      }
    }
  } catch (refreshError: any) {
    if (isApiRequest) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Unauthorized', message: refreshError.name })
    } else {
      req.flash('error', refreshError.name)
      return res.redirect('/users/login')
    }
  }
}

async function refreshAccessToken(req: Request, res: Response, decoded_refresh_token: any) {
  const { user_id, exp } = decoded_refresh_token
  const result = await usersService.refreshToken({ user_id, refresh_token: req.cookies.refresh_token, exp })

  const user = await databaseService.User.findOne({
    deleted: false,
    _id: new ObjectId(decoded_refresh_token.user_id)
  })
  res.locals.role = await databaseService.Role.findOne({ deleted: false, _id: new ObjectId(user?.role_id) })
  res.cookie('access_token', result.access_token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'strict'
  })
  res.cookie('refresh_token', result.refresh_token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'strict'
  })
}

export default authenticateToken
