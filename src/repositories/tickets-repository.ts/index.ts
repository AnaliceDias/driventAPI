import { prisma } from "@/config";

async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

const ticketsRepository = {
  findTicketsTypes,
};

export default ticketsRepository;
