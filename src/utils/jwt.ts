import { config } from 'dotenv'
import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenPayload } from '~/models/requests/user.request'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { envConfig } from '~/constants/config'
config()
export const signToken = ({
  payload,
  privateKey,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}

export const verifyToken = ({ token, secretOrPublicKey }: { token: string; secretOrPublicKey: string }) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (error, decoded) => {
      if (error) {
        throw reject(error)
      }
      resolve(decoded as TokenPayload)
    })
  })
}

export function signAccessToken({ user_id }: { user_id: string }) {
  return signToken({
    payload: {
      user_id,
      token_type: TokenType.AccessToken
    },
    privateKey: envConfig.jwtSecretAccessToken,
    options: {
      expiresIn: envConfig.accessTokenExpiresIn
    }
  })
}
export function signRefreshToken({ user_id, exp }: { user_id: string; exp?: number }) {
  if (exp) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        exp
      },
      privateKey: envConfig.jwtSecretRefreshToken
    })
  }

  return signToken({
    payload: {
      user_id,
      token_type: TokenType.RefreshToken
    },
    privateKey: envConfig.jwtSecretRefreshToken,
    options: {
      expiresIn: envConfig.refreshTokenExpiresIn
    }
  })
}

export function signAccessAndRefreshToken({ user_id }: { user_id: string }) {
  return Promise.all([signAccessToken({ user_id }), signRefreshToken({ user_id })])
}

export function decodeRefreshToken(refresh_token: string) {
  return verifyToken({
    token: refresh_token,
    secretOrPublicKey: envConfig.jwtSecretRefreshToken
  })
}
