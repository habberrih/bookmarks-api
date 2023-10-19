import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/service/prisma.service';
import * as pactum from 'pactum';
import passport from 'passport';
import { timeout } from 'rxjs';

describe('App e2e test', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const appModuleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = appModuleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await app.listen(6000);

    prisma = app.get(PrismaService);

    await prisma.cleanDatabase();
  });

  afterAll(async () => {
    app.close();
  });

  describe('Auth Module', () => {
    describe('Signup', () => {
      it('should be return 201 when user is signed up', async () => {
        return pactum
          .spec()
          .post('http://localhost:6000/api/auth/signup')
          .withBody({
            username: 'test',
            name: 'test',
            email: 'test@test.com',
            password: 'password',
          })
          .expectStatus(201);
      });
    });

    describe('Login', () => {});
  });

  describe('User Module', () => {
    describe('Get Me', () => {});

    describe('Edit User', () => {});
  });

  describe('Bookmark Module', () => {
    describe('Create Bookmark', () => {});

    describe('Get Bookmarks', () => {});

    describe('Get Bookmark by Id', () => {});

    describe('Edit Bookmark', () => {});

    describe('Delete Bookmark', () => {});
  });
});
