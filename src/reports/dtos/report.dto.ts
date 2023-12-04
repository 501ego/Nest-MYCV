import { Expose, Transform } from 'class-transformer'

export class ReportDto {
  @Expose()
  id: number
  @Expose()
  price: number
  @Expose()
  year: number
  @Expose()
  lng: number
  @Expose()
  lat: number
  @Expose()
  mileage: number
  @Expose()
  make: string
  @Expose()
  model: string
  @Expose()
  approved: boolean

  // @Transform(({ obj }) => obj) // obj is the object that is being transformed
  // In this case, obj is the reference to the Report entity
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number
}
