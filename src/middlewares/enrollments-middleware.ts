import { AuthenticatedRequest } from "@/middlewares";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import enrollmentsService from "@/services/enrollments-service";

async function checkEnrollment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.body;
  try {
    const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);

    if(!enrollment) return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    
    next();
  }catch(error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const enrollmentssMiddleware = {
  checkEnrollment,
};

export default enrollmentssMiddleware;
