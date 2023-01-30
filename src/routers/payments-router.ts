import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { checkUserTicket } from "@/middlewares/payments-middleware";
import { getPaymentsByTicketId } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", checkUserTicket, getPaymentsByTicketId);

export { paymentsRouter };
