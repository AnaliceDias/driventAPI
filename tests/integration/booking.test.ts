import app, { init } from "@/app";
import { prisma } from "@/config";
import faker from "@faker-js/faker";
import { TicketStatus } from "@prisma/client";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createEnrollmentWithAddress, createHotel, createPayment, createRoomWithHotelId, createTicket, createTicketTypeWithHotel, createUser, generateNonExistentRoomId } from "../factories";
import { createBooking } from "../factories/booking-factory";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  await prisma.$disconnect();
});

const server = supertest(app);

describe("/booking when there are authentication problems", () => {
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const id = faker.random.numeric();

    const responsePost = await server.post("/booking").set("Authorization", `Bearer ${token}`);
    const responseGet = await server.get("/booking").set("Authorization", `Bearer ${token}`);
    const responsePut = await server.put(`/booking/${id}`).set("Authorization", `Bearer ${token}`);

    expect(responsePost.status).toBe(httpStatus.UNAUTHORIZED);
    expect(responseGet.status).toBe(httpStatus.UNAUTHORIZED);
    expect(responsePut.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const id = faker.random.numeric();

    const responsePost = await server.post("/booking").set("Authorization", `Bearer ${token}`);
    const responseGet = await server.post("/booking").set("Authorization", `Bearer ${token}`);
    const responsePut = await server.put(`/booking/${id}`).set("Authorization", `Bearer ${token}`);

    expect(responsePost.status).toBe(httpStatus.UNAUTHORIZED);
    expect(responseGet.status).toBe(httpStatus.UNAUTHORIZED);
    expect(responsePut.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const id = faker.random.numeric();

    const responsePost = await server.post("/booking").set("Authorization", `Bearer ${token}`);
    const responseGet = await server.post("/booking").set("Authorization", `Bearer ${token}`);
    const responsePut = await server.post(`/booking/${id}`).set("Authorization", `Bearer ${token}`);

    expect(responsePost.status).toBe(httpStatus.UNAUTHORIZED);
    expect(responseGet.status).toBe(httpStatus.UNAUTHORIZED);
    expect(responsePut.status).toBe(httpStatus.UNAUTHORIZED);
  });
});
