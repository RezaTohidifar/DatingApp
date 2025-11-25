import { Photo } from "./Photo"

export interface Member {
  id: number
  userName: string
  age: number
  photoUrl: string
  knownAs: string
  createdAt: Date
  lstActive: Date
  introduction: string
  lookingFor: string
  city: string
  country: string
  photos: Photo[]
}

