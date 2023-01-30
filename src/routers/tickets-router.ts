import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createTicket, getTicketByUserId, getTicketsTypes } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getTicketByUserId)
  .post("/", createTicket);

export { ticketsRouter };
