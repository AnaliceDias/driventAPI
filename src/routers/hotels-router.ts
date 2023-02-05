import { Router } from "express";
import { authenticateToken,  } from "@/middlewares";
import hotelsMiddleware from "@/middlewares/hotels-middleware";
import { getHotelRoomsById, getHotels } from "@/controllers/hotels-controller";
import enrollmentssMiddleware from "@/middlewares/enrollments-middleware";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken, enrollmentssMiddleware.checkEnrollment, hotelsMiddleware.checkIncludesHotel)
  .get("/", getHotels)
  .get("/:hotelId", getHotelRoomsById);

export { hotelsRouter };
