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

async function findTicketPrice(ticketTypeId: number) {
  return prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId
    }
  });
}

const ticketsRepository = {
  findTicketsTypes,
  findTicketByUserId,
  createTicket,
  findTicketByTicketId,
  findTicketPrice,
};

export default ticketsRepository;
