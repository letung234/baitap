import { signAccessToken, signRefreshToken, decodeRefreshToken } from '../utils/jwt'
import databaseService from '~/services/database.service'
import { ObjectId } from 'mongodb'
import RefreshToken from '~/models/schemas/refreshtoken.model'
import User from '~/models/schemas/user.model'
import { envConfig } from '~/constants/config'
import { signToken, verifyToken } from '~/utils/jwt'
class Service {
  async refreshToken({
    user_id,
    refresh_token,
    exp
  }: {
    user_id: string
    refresh_token: string | undefined
    exp: number
  }) {
    const [new_access_token, new_refresh_token] = await Promise.all([
      signAccessToken({ user_id }),
      signRefreshToken({ user_id, exp }),
      databaseService.refreshTokens.deleteOne({ token: refresh_token })
    ])
    const decoded_refresh_token = await decodeRefreshToken(new_refresh_token)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        user_id: new ObjectId(user_id),
        token: new_refresh_token,
        iat: decoded_refresh_token.iat,
        exp: decoded_refresh_token.exp
      })
    )
    return {
      access_token: new_access_token,
      refresh_token: new_refresh_token
    }
  }
  private signAccessToken({ user_id }: { user_id: string }) {
    return signToken({
      payload: {
        user_id
      },
      privateKey: envConfig.jwtSecretAccessToken as string,
      options: {
        expiresIn: envConfig.accessTokenExpiresIn
      }
    })
  }
  private signRefreshToken({ user_id, exp }: { user_id: string; exp?: number }) {
    if (exp) {
      return signToken({
        payload: {
          user_id,
          exp
        },
        privateKey: envConfig.jwtSecretRefreshToken as string
      })
    }
    return signToken({
      payload: {
        user_id
      },
      privateKey: envConfig.jwtSecretRefreshToken as string,
      options: {
        expiresIn: envConfig.refreshTokenExpiresIn
      }
    })
  }
  private signAccessAndRefreshToken({ user_id }: { user_id: string }) {
    return Promise.all([this.signAccessToken({ user_id }), this.signRefreshToken({ user_id })])
  }
  private decodeRefreshToken(refresh_token: string) {
    return verifyToken({
      token: refresh_token,
      secretOrPublicKey: envConfig.jwtSecretRefreshToken as string
    })
  }
  async Register(data: any) {
    const user = new User(data)
    const result = await databaseService.User.insertOne(user)
    return result
  }
  async Update(id: string, data: any) {
    const result = await databaseService.User.updateOne({ _id: new ObjectId(id) }, { $set: data })
    return result
  }
  async Delete(id: string) {
    const result = await databaseService.User.updateOne(
      { _id: new ObjectId(id) },
      { $set: { deleted: true, deleted_at: new Date() } }
    )
    return result
  }
  async Login({ user_id }: { user_id: string }) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken({
      user_id
    })
    const { iat, exp } = await this.decodeRefreshToken(refresh_token)

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token, iat, exp })
    )
    return {
      access_token,
      refresh_token
    }
  }
}
const UsersService = new Service()
export default UsersService
