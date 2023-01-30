import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import paymentsServices from "@/services/payments-service";
import ticketsService from "@/services/tickets-sevice";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function checkUserTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  let ticketId;
  const { userId } = req;

  req.query.ticketId? ticketId = req.query.ticketId : 
    req.body.ticketId? ticketId = req.body.ticketId : res.sendStatus(httpStatus.BAD_REQUEST);

  if(!ticketId || !userId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const ticket = await ticketsService.getTicketByTicketId(+ticketId);
    res.locals.ticket = ticket;
    const enrollment = await enrollmentsService.getEnrollmentById(ticket.enrollmentId);
    await paymentsServices.checkUserId(enrollment, userId);

    next();
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
