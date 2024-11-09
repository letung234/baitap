import { MediaType } from '~/constants/enums'

export interface Media {
  url: string
  type: MediaType // video, image
  public_id?: string
}
