import mediasService from '../../services/medias.service'
import { Request, Response } from 'express'
import HTTP_STATUS from '../../constants/httpStatus'
export const upload = async (req: Request, res: Response) => {
  const result = await mediasService.uploadImage(req)
  console.log(result)
  res.json({ location: result[0].url, public_id: result[0].public_id })
}

export const deleteImage = async (req: Request, res: Response) => {
  const id = req.params.id
  console.log(id)
  const result = await mediasService.deleteImage(id)
  return res.status(HTTP_STATUS.OK).json(result)
}
