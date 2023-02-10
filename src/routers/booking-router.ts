import { Router } from "express";
import { authenticateToken, checkVacancies } from "@/middlewares";
import { getBookingByToken, registerBooking } from "@/controllers/booking-controller";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBookingByToken)
  .post("/", checkVacancies, registerBooking);

export { bookingRouter };
