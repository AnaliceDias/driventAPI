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

describe("GET /booking", () => {
  it("should respond with status 200", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeWithHotel();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(ticket.id, ticketType.price);
    const hotel = await createHotel();
    const room = await createRoomWithHotelId(hotel.id);
    await createBooking(user.id, room.id);
    
    const response = await server.get("/booking").set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual({
      id: expect.any(Number),
      Room: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        capacity: expect.any(Number),
        hotelId: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),

      })
    });
  });

  it("should respond with status 404 when the user does not have booking", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeWithHotel();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(ticket.id, ticketType.price);
    const hotel = await createHotel();
    await createRoomWithHotelId(hotel.id);
    
    const response = await server.get("/booking").set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });
});

describe("POST /booking", () => {
  it("should respond with status 201", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeWithHotel();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(ticket.id, ticketType.price);
    const hotel = await createHotel();
    const room = await createRoomWithHotelId(hotel.id);

    const body = {
      roomId: room.id,
    };

    const response = await server.post("/booking").set("Authorization", `Bearer ${token}`).send(body);
    
    expect(response.status).toEqual(httpStatus.CREATED);
    expect(response.body).toEqual({
      roomId: expect.any(Number),
    });
  });

  it("should respond with status 404 when roomId does not exist", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeWithHotel();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(ticket.id, ticketType.price);
    const hotel = await createHotel();
    const room = await createRoomWithHotelId(hotel.id);
    const nonExistentRommId = await generateNonExistentRoomId(room.id);

    const body = {
      roomId: nonExistentRommId,
    };

    const response = await server.post("/booking").set("Authorization", `Bearer ${token}`).send(body);
    
    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });
});

describe("PUT /booking/:bookingId", () => {
  it("should respond with status 200", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeWithHotel();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(ticket.id, ticketType.price);
    const hotel = await createHotel();
    const firstRoom = await createRoomWithHotelId(hotel.id);
    const booking = await createBooking(user.id, firstRoom.id);
    const secondRoom = await createRoomWithHotelId(hotel.id);
    
    const body = {
      roomId: secondRoom.id,
    };

    const response = await server.put(`/booking/${booking.id}`).set("Authorization", `Bearer ${token}`).send(body);

    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body).toEqual({
      bookingId: expect.any(Number),
    });
  });

  it("should respond with status 404 when roomId does not exist", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketTypeWithHotel();
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(ticket.id, ticketType.price);
    const hotel = await createHotel();
    const room = await createRoomWithHotelId(hotel.id);
    const booking = await createBooking(user.id, room.id);
    const nonExistentRommId = await generateNonExistentRoomId(room.id);

    const body = {
      roomId: nonExistentRommId,
    };

    const response = await server.put(`/booking/${booking.id}`).set("Authorization", `Bearer ${token}`).send(body);
    
    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  });

  it("should return 403 when the room has no more spaces available", async () => {
    const ticketType = await createTicketTypeWithHotel();
    const hotel = await createHotel();
    const room = await createRoomWithHotelId(hotel.id);

    const firtsUser = await createUser();
    const firstEnrollment = await createEnrollmentWithAddress(firtsUser);
    const firstTicket = await createTicket(firstEnrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(firstTicket.id, ticketType.price);
    await createBooking(firtsUser.id, room.id);

    const secondUser = await createUser();
    const secondEnrollment = await createEnrollmentWithAddress(secondUser);
    const secondTicket = await createTicket(secondEnrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(secondTicket.id, ticketType.price);
    await createBooking(secondUser.id, room.id);

    const thirdUser = await createUser();
    const thirdEnrollment = await createEnrollmentWithAddress(thirdUser);
    const thirdTicket = await createTicket(thirdEnrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(thirdTicket.id, ticketType.price);
    await createBooking(thirdUser.id, room.id);

    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    await createPayment(ticket.id, ticketType.price);
    const booking = await createBooking(user.id, room.id);
    
    const body = {
      roomId: room.id,
    };

    const response = await server.put(`/booking/${booking.id}`).set("Authorization", `Bearer ${token}`).send(body);

    expect(response.status).toEqual(httpStatus.FORBIDDEN);
  });
});
