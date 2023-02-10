import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import hotelService from "@/services/hotels-service";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function checkVacancies(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { roomId } = req.body;
  try{
    const occupiedSeats = await bookingService.countBookingByRoomId(roomId);
    const room = await hotelService.getRoomById(roomId);
    
    if(room.capacity <= occupiedSeats) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    next();
  }catch(error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
