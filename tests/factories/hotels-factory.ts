import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotels() {
  const hotel_1 = await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.datatype.string(),
    },
  });
  await prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number(),
      hotelId: hotel_1.id,
    }
  });

  const hotel_2 = await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.datatype.string(),
    },
  });
  await prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number(),
      hotelId: hotel_2.id,
    }
  });

  const hotel_3 = await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.datatype.string(),
    },
  });
  await prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number(),
      hotelId: hotel_3.id,
    }
  });
  return [hotel_1, hotel_2, hotel_3];
}
