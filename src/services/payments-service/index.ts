import { notFoundError, unauthorizedError } from "@/errors"; 
import paymentsRepository from "@/repositories/payments-repository";
import { Enrollment, Payment } from "@prisma/client";

async function getPaymentsByTicketId(ticketId: number) {
  const payment = await paymentsRepository.findPaymentsByTicketId(ticketId);
  if (!payment) throw notFoundError();
  
  return payment;
}

async function checkUserId(enrollment: Enrollment, userId: number) {
  if(enrollment.userId !== userId) throw unauthorizedError();
  return;
}

async function registerPayment(payment: Omit<Payment, "id" | "updatedAt" | "createdAt">) {
  const newPayment = await paymentsRepository.insertPayment(payment);
  if (!newPayment) throw notFoundError();

  return newPayment;
}

const paymentsServices = {
  checkUserId,
  getPaymentsByTicketId,
  registerPayment,
};
  
export default paymentsServices;
