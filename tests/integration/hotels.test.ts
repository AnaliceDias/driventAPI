import app, { init } from "@/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import { TicketStatus } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { createEnrollmentWithAddress, createPayment, createTicket, createTicketTypeCustomizable, createUser } from "../factories";
import { createHotels } from "../factories/hotels-factory";

const server = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

describe("Authentication tests for the hotels route", () => {
  it("should respond with status 401 if user has logged out", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/hotels/*").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = "issoNaoEUmToken";

    const resNoToken = await server.get("/hotels/*");
    const resInvalidToken = await server.get("/hotels/*").set("Authorization", `Bearer ${token}`);

    expect(resNoToken.status).toBe(httpStatus.UNAUTHORIZED);
    expect(resInvalidToken.status).toBe(httpStatus.UNAUTHORIZED);
  });
});

describe("GET /hotels", () => {
  it("should respond with status 200 and the list of hotels", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeCustomizable(false, true);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(ticket.id, ticketType.price);
    await createHotels();

    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ 
          id: expect.any(Number),
          name: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String) 
        })
      ])
    );
  });
});
