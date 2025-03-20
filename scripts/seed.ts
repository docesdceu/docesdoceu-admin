import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário administrador
  const hashedPassword = await bcrypt.hash('docesdasol20', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@docesdoceu.com' },
    update: {},
    create: {
      email: 'admin@docesdoceu.com',
      name: 'Administrador',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 