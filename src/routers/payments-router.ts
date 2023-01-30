import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { checkUserTicket } from "@/middlewares/payments-middleware";
import { getPaymentsByTicketId, processPayment } from "@/controllers/payments-controller";
import { cardSchema } from "@/schemas/payments-schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", checkUserTicket, getPaymentsByTicketId)
  .post("/process", validateBody(cardSchema), checkUserTicket, processPayment);

export { paymentsRouter };
