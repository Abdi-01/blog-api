const { PrismaClient } = require("../prisma/generated/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  // Hashing password dengan bcrypt
  const saltRounds = 10;
  const hashedPassword1 = await bcrypt.hash("passwordUser1", saltRounds);
  const hashedPassword2 = await bcrypt.hash("passwordAuthor1", saltRounds);

  // Membuat user
  const user1 = await prisma.user.create({
    data: {
      username: "user1",
      email: "user1@example.com",
      password: hashedPassword1,
      role: "user",
      imgProfile: "https://example.com/profile1.jpg",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "author1",
      email: "author1@example.com",
      password: hashedPassword2,
      role: "author",
      imgProfile: "https://example.com/profile2.jpg",
    },
  });

  // Membuat kategori
  const category1 = await prisma.category.create({
    data: {
      name: "Technology",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Lifestyle",
    },
  });

  // Membuat artikel untuk user 2 (author1)
  await prisma.article.create({
    data: {
      title: "The Future of AI",
      content: "Artificial Intelligence (AI) is evolving rapidly...",
      image: "https://example.com/ai.jpg",
      userId: user2.id,
      categoryId: category1.id,
    },
  });

  await prisma.article.create({
    data: {
      title: "Healthy Living Tips",
      content: "Living a healthy life requires...",
      image: "https://example.com/health.jpg",
      userId: user2.id,
      categoryId: category2.id,
    },
  });

  console.log("Data dummy berhasil dibuat.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
