import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import hotelService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getBookingByToken(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBookingByUserId(userId);
    const room = await hotelService.getRoomById(booking.roomId);
    const response = {
      id: booking.id,
      Room: { ...room }
    };
    
    return res.status(httpStatus.OK).send(response);
  }catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function registerBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    await bookingService.registerBooking(userId, roomId);
    const response = {
      roomId: roomId
    };

    return res.status(httpStatus.CREATED).send(response);
  }catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const { roomId } = req.body;
  const { bookingId } = req.params;
  try{
    const bookingUpdate = await bookingService.updateBooking(+bookingId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: bookingUpdate.id });
  }catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
