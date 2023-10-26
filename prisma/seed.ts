import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const password =
  '$argon2id$v=19$m=65536,t=3,p=4$WEoOgAhi3VqmdgclpcAkhg$5Kw9eFZBfDZMAGj+n6UqTVuPshogfAS+tINHOZFGNSU';

const userData: Prisma.UserCreateInput[] = [
  {
    id: 'abb01bb4-6194-45aa-b7bf-6234e2b9394f',
    username: 'abdullah',
    email: 'abdullah@prisma.com',
    name: 'Abdullah Account',
    password,
    createdAt: new Date('2023-10-26'),
    updatedAt: new Date('2023-10-26'),
  },
  {
    id: '09c20b61-2de5-4b84-a051-678eccf883ea',
    username: 'user',
    email: 'user@prisma.com',
    name: 'User Account',
    password,
    createdAt: new Date('2023-10-26'),
    updatedAt: new Date('2023-10-26'),
  },
  {
    id: '323c332b-4bed-40cd-a1a1-d42221ee077b',
    username: 'blah',
    email: 'blah@prisma.com',
    name: 'Blah Account',
    password,
    createdAt: new Date('2023-10-26'),
    updatedAt: new Date('2023-10-26'),
  },
];

const bookmarkData: Prisma.BookmarkCreateInput[] = [];

async function main() {
  console.log('Start seeding ...');

  for (const user of userData) {
    const seededUsers = await prisma.user.create({
      data: user,
    });
    console.log(`Created user with id: ${seededUsers.id}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
