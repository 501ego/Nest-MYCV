import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from '../../users/entities/user.entity'
@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  price: number

  @Column()
  make: string

  @Column()
  model: string

  @Column()
  year: number

  @Column()
  lng: number

  @Column()
  lat: number

  @Column()
  mileage: number

  @Column({ default: false })
  approved: boolean

  //() => User is a function that returns the entity that we want to relate to
  // (user) => user.reports is the property on the User entity that we want to use to get the related reports
  @ManyToOne(() => User, (user) => user.reports)
  user: User
}
