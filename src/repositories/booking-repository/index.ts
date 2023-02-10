import { prisma } from "@/config";

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId
    }
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId
    }
  });
}

async function countBookingByRoomId(roomId: number) {
  return prisma.booking.count({
    where: {
      roomId: roomId,
    },
  });
}

async function updateBooking(bookingId: number, newRoomId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId: newRoomId,
    }
  });
}

const bookingRepository = {
  findBookingByUserId,
  createBooking,
  countBookingByRoomId,
  updateBooking,
};

export default bookingRepository;
