import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketByUserId, getTicketsTypes } from "@/controllers/tickets-controller";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getTicketByUserId);

export { ticketsRouter };
