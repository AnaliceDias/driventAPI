import { AuthenticatedRequest } from "@/middlewares";
import paymentsServices from "@/services/payments-service";
import ticketsService from "@/services/tickets-sevice";
import { Response } from "express";
import httpStatus from "http-status";
import { stringify } from "querystring";

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

export async function processPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.body;
  const ticket = res.locals.ticket;
  let cardLastDigits = req.body.cardData.number;
  cardLastDigits = cardLastDigits.substring(cardLastDigits.lenght - 4);

  try {
    const price = await ticketsService.getTicketPrice(ticket.ticketTypeId);

    const paymentData = {
      ticketId: +ticketId,
      value: price,
      cardIssuer: stringify(req.body.cardData.issuer),
      cardLastDigits: stringify(cardLastDigits),
    };

    const newPayment = await paymentsServices.registerPayment(paymentData);
    
    return res.status(httpStatus.OK).send(newPayment);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
