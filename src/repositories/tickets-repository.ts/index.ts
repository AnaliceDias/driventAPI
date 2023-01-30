import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketByUserId(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  const data: Omit<Ticket, "id" | "createdAt" | "updatedAt" > = {
    ticketTypeId: ticketTypeId,
    enrollmentId: enrollmentId,
    status: "RESERVED"
  };

  return prisma.ticket.create({
    data: data,
    include: {
      TicketType: true,
    },
  });
}

async function findTicketByTicketId(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId
    }
  });
}

const ticketsRepository = {
  findTicketsTypes,
  findTicketByUserId,
  createTicket,
  findTicketByTicketId,
};

export default ticketsRepository;
