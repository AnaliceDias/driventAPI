import { notFoundError } from "@/errors"; 
import paymentsRepository from "@/repositories/payments-repository";

async function getPaymentsByTicketId(ticketId: number) {
  const payment = await paymentsRepository.findPaymentsByTicketId(ticketId);
  if (!payment) throw notFoundError();
  
  return payment;
}

const paymentsServices = {
  getPaymentsByTicketId,
};
  
export default paymentsServices;
