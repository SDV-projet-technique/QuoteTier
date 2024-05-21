import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  ////////////////////////////////////// Create authors //////////////////////////////////////
  const albert = await prisma.author.create({
    data: {
      name: "Albert Einstein",
    },
  });
  const sigmund = await prisma.author.create({
    data: {
      name: "Sigmund Freud",
    },
  });
  const johnpasdoe = await prisma.author.create({
    data: {
      name: "John Pasdoe",
    },
  });
  const peda = await prisma.author.create({
    data: {
      name: "La pédagogie",
    },
  });
  const jonny = await prisma.author.create({
    data: {
      name: "Jonny Silverhand",
    },
  });
  const renault = await prisma.author.create({
    data: {
      name: "Renault",
    },
  });
  const george = await prisma.author.create({
    data: {
      name: "George Clooney",
    },
  });
  const misterv = await prisma.author.create({
    data: {
      name: "Mister V",
    },
  });
  const kid = await prisma.author.create({
    data: {
      name: "Random Kid",
    },
  });
  const picolo = await prisma.author.create({
    data: {
      name: "Picolo",
    },
  });
  const emir = await prisma.author.create({
    data: {
      name: "Emir Deljanin",
    },
  });

  ////////////////////////////////////// Create quotes //////////////////////////////////////
  //------------------ Faked ------------------//
  await prisma.quote.create({
    data: {
      text: "Pee is stored in the balls.",
      approved: false,
      authorId: albert.id,
    },
  });
  await prisma.quote.create({
    data: {
      text: "Une fois, j'me suis couché il était minuit dix. Bonjour comment j'étais fatigué !",
      approved: false,
      authorId: sigmund.id,
    },
  });
  await prisma.quote.create({
    data: {
      text: "C'est pas plus mieux que si c'était pire.",
      approved: false,
      authorId: johnpasdoe.id,
    },
  });
  await prisma.quote.create({
    data: {
      text: "Si tes élèves sont en surcharge de travail, c'est pas grave tu peux leurs rajouter du taff.",
      approved: true,
      authorId: peda.id,
    },
  });
  await prisma.quote.create({
    data: {
      text: "Wake the fuck up, Samurai! We have a city to burn.",
      approved: true,
      authorId: jonny.id,
    },
  });
  await prisma.quote.create({
    data: {
      text: "Casse toi tu pue et marche a l'ombre.",
      approved: false,
      authorId: renault.id,
    },
  });
  await prisma.quote.create({
    data: {
      text: "Connard de viruseeuuu.",
      approved: false,
      authorId: renault.id,
    },
  });
  await prisma.quote.create({
    data: {
      text: "I have a dream !",
      approved: false,
      authorId: george.id,
    },
  });
  await prisma.quote.create({
    data: {
      text: "Ho une meuf avec des gros seins elle pourrait pas faire de la F1, hein l'équipe ?",
      approved: false,
      authorId: misterv.id,
    },
  });
  await prisma.quote.create({
    data: {
      text: "The balls are Inert",
      approved: false,
      authorId: picolo.id,
    },
  });
  await prisma.quote.create({
    data: {
      text: "Have you ever had a dream that you, um, you had, your, you- you could, you’ll do, you- you wants, you, you could do so, you- you’ll do, you could- you, you want, you want them to do you so much you could do anything?",
      approved: true,
      authorId: kid.id,
    },
  });

  await prisma.quote.create({
    data: {
      text: "C'est pas long, y'a juste 300 pages à lire.",
      approved: true,
      authorId: emir.id,
    },
  });
}

main()
  .then(async () => {
    console.log("Seeded data successfully");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
