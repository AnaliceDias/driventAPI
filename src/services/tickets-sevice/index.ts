import { notFoundError } from "@/errors"; 
import ticketsRepository from "@/repositories/tickets-repository.ts";

async function getTicketsTypes() {
  const result = await ticketsRepository.findTicketsTypes();
  if (!result) throw notFoundError();
  return result;
}

async function getTicketByUserId(userId: number) {
  const result = await ticketsRepository.findTicketByUserId(userId);
  if (!result) throw notFoundError();
  return result;
}

const ticketsService = {
  getTicketsTypes,
  getTicketByUserId
};

export default ticketsService;
