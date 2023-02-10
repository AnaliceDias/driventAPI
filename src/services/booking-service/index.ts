import { notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";

async function getBookingByUserId(userId: number) {
  const booking = await bookingRepository.findBookingByUserId(userId);
  if(!booking) throw notFoundError;
  return booking;
}

async function registerBooking(userId: number, roomId: number) {
  const booking = await bookingRepository.createBooking(userId, roomId);

  if(!booking) throw notFoundError;
  return booking;
}

async function countBookingByRoomId(roomId: number) {
  const count = await bookingRepository.countBookingByRoomId(roomId);
  if(!count) throw notFoundError;
  return count;
}

const bookingService = {
  getBookingByUserId,
  registerBooking,
  countBookingByRoomId,
};

export default bookingService;
