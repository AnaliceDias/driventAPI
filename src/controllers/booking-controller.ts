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
