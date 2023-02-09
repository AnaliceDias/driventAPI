import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBookingByToken } from "@/controllers/booking-controller";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBookingByToken);

export { bookingRouter };
