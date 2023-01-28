import { AuthenticatedRequest } from "@/middlewares";
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
