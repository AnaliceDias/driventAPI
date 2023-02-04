import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findHotelRoomsById(hotelId: number) {
  const hotel = await prisma.hotel.findUnique({
    where: {
      id: hotelId
    }
  });

  const rooms = await prisma.room.findMany({
    where: {
      hotelId: hotelId,
    },
  });

  return { ...hotel, Rooms: [...rooms] };
}

const hotelsRepository = {
  findHotels,
  findHotelRoomsById,
};
    
export default hotelsRepository;
