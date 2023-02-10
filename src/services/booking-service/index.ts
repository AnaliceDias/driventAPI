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

const bookingService = {
  getBookingByUserId,
  registerBooking,
};

export default bookingService;
