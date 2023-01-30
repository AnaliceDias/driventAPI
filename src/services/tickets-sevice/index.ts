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

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  const result = ticketsRepository.createTicket(ticketTypeId, enrollmentId);
  if (!result) throw notFoundError();
  
  return result;
}

async function getTicketByTicketId(ticketId: number) {
  const result = await ticketsRepository.findTicketByTicketId(ticketId);
  if (!result) throw notFoundError();
  return result;
}

async function getTicketPrice(ticketTypeId: number) {
  const ticketType = await ticketsRepository.findTicketPrice(ticketTypeId);
  const price = ticketType.price;

  return price;
}

const ticketsService = {
  getTicketsTypes,
  getTicketByUserId,
  createTicket,
  getTicketByTicketId,
  getTicketPrice,
};

export default ticketsService;
