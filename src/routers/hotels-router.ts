import { Router } from "express";
import { authenticateToken,  } from "@/middlewares";
import hotelsMiddleware from "@/middlewares/hotels-middleware";
import { getHotelRoomsById, getHotels } from "@/controllers/hotels-controller";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken, hotelsMiddleware.checkIncludesHotel)
  .get("/", getHotels)
  .get("/:hotelId", getHotelRoomsById);

export { hotelsRouter };
