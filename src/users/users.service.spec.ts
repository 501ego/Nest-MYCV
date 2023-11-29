import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './entities/user.entity'

// Mock repository
const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
}

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a new user', async () => {
    const user = { email: 'test@example.com', password: 'password123' }
    mockRepository.create.mockReturnValue(user)
    mockRepository.save.mockResolvedValue(user)

    expect(await service.create(user.email, user.password)).toEqual(user)
    expect(mockRepository.create).toHaveBeenCalledWith(user)
    expect(mockRepository.save).toHaveBeenCalledWith(user)
  })

  // other test cases...
})
