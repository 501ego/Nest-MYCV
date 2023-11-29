import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  // Repository<User> is a generic type. It tells TypeScript that this repository will only be used with the User entity.
  // The @InjectRepository() decorator is used to inject the repository into the service.
  // @InjectRepository(User) tells Nest that we want a repository that manages the User entity.
  // @InjectRepository(User) is required because Nest can't infer the type of the repository.
  // repository is an instance of the Repository class. It has many useful methods for accessing the database.
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(email: string, password: string) {
    // if we use only save(), hooks will not be called.
    const user = this.repository.create({ email, password }) // create a new user instance from User entity.
    return this.repository.save(user) // save the user instance and return it - Persistence
  }

  findOne(id: number) {
    if (!id) {
      return null
    }
    return this.repository.findOne({ where: { id } })
  }

  find(email: string) {
    return this.repository.find({ where: { email } })
  }

  // Partial<User> means that all properties of User are optional. attrs means attributes.
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException('user not found')
    }
    Object.assign(user, attrs) // copy attrs properties to user
    return this.repository.save(user)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException('user not found')
    }
    return this.repository.remove(user)
  }
}
