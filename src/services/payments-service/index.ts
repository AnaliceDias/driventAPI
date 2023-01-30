import { notFoundError, unauthorizedError } from "@/errors"; 
import paymentsRepository from "@/repositories/payments-repository";
import { Enrollment } from "@prisma/client";

async function getPaymentsByTicketId(ticketId: number) {
  const payment = await paymentsRepository.findPaymentsByTicketId(ticketId);
  if (!payment) throw notFoundError();
  
  return payment;
}

async function checkUserId(enrollment: Enrollment, userId: number) {
  if(enrollment.userId !== userId) throw unauthorizedError();
  return;
}
const paymentsServices = {
  checkUserId,
  getPaymentsByTicketId,
};
  
export default paymentsServices;
