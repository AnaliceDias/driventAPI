import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findPaymentsByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });
}

async function insertPayment(payment: Omit<Payment, "id" | "updatedAt" | "createdAt">) {
  return prisma.payment.create({
    data: payment
  });
}

const paymentsRepository = {
  findPaymentsByTicketId,
  insertPayment,
};
    
export default paymentsRepository;
