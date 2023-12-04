import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm'
import { Report } from '../../reports/entities/report.entity'
//TYPEOR is a library that helps us to interact with the database.. Object Relational Mapper (ORM). it uses oop to interact with the database.
// all after hooks are called after the entity is saved to the database.

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @Column({ default: true })
  admin: boolean

  // this is a virtual column, it is not stored in the database, it is a getter
  // () => Report is a function that returns the entity that we want to relate to
  // (report) => report.user is the property on the Report entity that we want to use to get the related user
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id)
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id)
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id)
  }
}
