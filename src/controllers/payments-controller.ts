import { AuthenticatedRequest } from "@/middlewares";
import paymentsServices from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentsByTicketId(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;

  try {
    const payment = await paymentsServices.getPaymentsByTicketId(+ticketId);
    
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
