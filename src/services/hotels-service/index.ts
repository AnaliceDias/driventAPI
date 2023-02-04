import { notFoundError } from "@/errors";
import hotelsRepository from "@/repositories/hotel-repository";

async function getHotels() {
  const hotels = await hotelsRepository.findHotels();

  if(!hotels) throw notFoundError();
  return hotels;
}

const hotelsService = {
  getHotels,
};
    
export default hotelsService;
