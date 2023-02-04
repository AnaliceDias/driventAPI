import { AuthenticatedRequest } from "@/middlewares";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import ticketService from "@/services/tickets-service";

async function checkIncludesHotel(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.body;
  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    const ticketStatus = ticket.status;
    const includesHotel = ticket.TicketType.includesHotel;

    if(ticketStatus !== "PAID" || !includesHotel) return res.sendStatus(httpStatus.UNAUTHORIZED);
    
    next();
  }catch(error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const hotelsMiddleware = {
  checkIncludesHotel
};

export default hotelsMiddleware;
