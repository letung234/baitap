import { JwtPayload } from 'jsonwebtoken'
import { ProductStatus } from '~/constants/enums'
export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: string
  exp: number
  iat: number
}
export interface UserPayload {
  name: string
  email: string
  role_id: string
  password: string
  is_active: boolean
  deleted?: boolean
}
