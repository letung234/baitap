import { Request, Response, NextFunction, RequestHandler } from 'express'
import { request } from 'http'

export const wrapRequestHandler = <P = any, ResBody = any, ReqBody = any, ReqQuery = any>(
  func: RequestHandler<P, ResBody, ReqBody, ReqQuery>
) => {
  return async (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response<ResBody>, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
