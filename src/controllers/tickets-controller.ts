import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import ticketsService from "@/services/tickets-sevice";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const typesList = await ticketsService.getTicketsTypes();
    return res.send(typesList).status(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTicketByUserId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try{
    const tickets = await ticketsService.getTicketByUserId(userId);
    return res.send(tickets).status(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;

  if (!ticketTypeId) res.sendStatus(httpStatus.BAD_REQUEST);

  try{
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
    const enrollmentId = enrollment.id;
    const newTicket = await ticketsService.createTicket(ticketTypeId, enrollmentId);

    return res.status(httpStatus.CREATED).send(newTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
