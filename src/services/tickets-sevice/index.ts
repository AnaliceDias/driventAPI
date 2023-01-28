import { notFoundError } from "@/errors"; 
import ticketsRepository from "@/repositories/tickets-repository.ts";

async function getTicketsTypes() {
  const result = await ticketsRepository.findTicketsTypes();
  if (!result) throw notFoundError();
  return result;
}

const ticketsService = {
  getTicketsTypes,
};

export default ticketsService;
