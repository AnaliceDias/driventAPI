import { notFoundError } from "@/errors";
import hotelsRepository from "@/repositories/hotel-repository";

async function getHotels() {
  const hotels = await hotelsRepository.findHotels();

  if(!hotels) throw notFoundError();
  return hotels;
}

async function getHotelRoomsById(hotelId: number) {
  const rooms = await hotelsRepository.findHotelRoomsById(hotelId);

  if(!rooms || rooms.Rooms.length === 0) throw notFoundError();
  return rooms;
}

const hotelsService = {
  getHotels,
  getHotelRoomsById,
};
    
export default hotelsService;
