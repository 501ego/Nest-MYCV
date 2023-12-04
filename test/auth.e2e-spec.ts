import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import exp from 'constants'

describe('Authentication System ()', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('handles a signup request', () => {
    const email = Math.random().toString(36).substring(7) + '@test.com'

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asd123' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body
        expect(id).toBeDefined()
        expect(email).toEqual(email)
      })
  })

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'asd@asd.com'

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asd123' })
      .expect(201)

    const cookie = response.get('Set-Cookie')
    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200)

    expect(body.email).toEqual(email)
  })
})
