import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postModel from "../models/postModel";
import { Express } from "express";
import userModel, { User } from "../models/userModel";

var app: Express;

const baseUrl = "/auth";

type TestUser = User & {
  accessToken?: string;
  refreshToken?: string;
};

const testUser: TestUser = {
  _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
  username: "user",
  email: "user@test.com",
  password: "123",
  refreshTokens: [],
};

beforeAll(async () => {
  app = await initApp();
  await Promise.all([postModel.deleteMany(), userModel.deleteMany()]);
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe("Authentication Tests", () => {
  test("test authentication register", async () => {
    const response = await request(app)
      .post(baseUrl + "/register")
      .send(testUser);
    expect(response.statusCode).toBe(200);
  });

  test("test authentication register fail", async () => {
    const response = await request(app)
      .post(baseUrl + "/register")
      .send({
        email: "user@",
      });
    expect(response.statusCode).not.toBe(200);
  });

  test("test authentication login", async () => {
    const response = await request(app)
      .post(baseUrl + "/login")
      .send(testUser);
    expect(response.statusCode).toBe(200);
    const accessToken = response.body.accessToken;
    const refreshToken = response.body.refreshToken;
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
    expect(response.body._id).toBeDefined();
    testUser.accessToken = accessToken;
    testUser.refreshToken = refreshToken;
    testUser._id = response.body._id;
  });

  test("Check tokens are not the same", async () => {
    const response = await request(app)
      .post(baseUrl + "/login")
      .send(testUser);
    const accessToken = response.body.accessToken;
    const refreshToken = response.body.refreshToken;

    expect(accessToken).not.toBe(testUser.accessToken);
    expect(refreshToken).not.toBe(testUser.refreshToken);
  });

  test("Auth test login fail", async () => {
    const response = await request(app)
      .post(baseUrl + "/login")
      .send({
        email: testUser.email,
        password: "12",
      });
    expect(response.statusCode).not.toBe(200);
  });

  test("test authentication request", async () => {
    const response = await request(app).post("/posts").send({
      title: "post",
      content: "content",
      senderId: "user",
    });
    expect(response.statusCode).not.toBe(201);
    const response2 = await request(app)
      .post("/posts")
      .set({ authorization: "JWT " + testUser.accessToken })
      .send({
        title: "post",
        content: "content",
        senderId: "user",
      });
    expect(response2.statusCode).toBe(201);
  });

  test("test refresh token", async () => {
    const response = await request(app)
      .post(baseUrl + "/refreshToken")
      .send({
        refreshToken: testUser.refreshToken,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
    testUser.accessToken = response.body.accessToken;
    testUser.refreshToken = response.body.refreshToken;
  });

  test("Double use refresh token", async () => {
    const response = await request(app)
      .post(baseUrl + "/refreshToken")
      .send({
        refreshToken: testUser.refreshToken,
      });
    expect(response.statusCode).toBe(200);
    const newRefreshToken = response.body.refreshToken;

    const newResponse = await request(app)
      .post(baseUrl + "refreshToken")
      .send({
        refreshToken: newRefreshToken,
      });
    expect(newResponse.statusCode).not.toBe(200);
  });

  test("Test logout", async () => {
    const response = await request(app)
      .post(baseUrl + "/login")
      .send(testUser);
    expect(response.statusCode).toBe(200);
    testUser.accessToken = response.body.accessToken;
    testUser.refreshToken = response.body.refreshToken;

    const response2 = await request(app)
      .post(baseUrl + "/logout")
      .send({
        refreshToken: testUser.refreshToken,
      });
    expect(response2.statusCode).toBe(200);

    const response3 = await request(app)
      .post(baseUrl + "refreshToken")
      .send({
        refreshToken: testUser.refreshToken,
      });
    expect(response3.statusCode).not.toBe(200);
  });

  jest.setTimeout(10000);
  test("Test timeout token", async () => {
    const response = await request(app)
      .post(baseUrl + "/login")
      .send(testUser);
    expect(response.statusCode).toBe(200);
    testUser.accessToken = response.body.accessToken;
    testUser.refreshToken = response.body.refreshToken;

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response2 = await request(app)
      .post("/posts")
      .set({ authorization: "JWT " + testUser.accessToken })
      .send({
        title: "post",
        content: "content",
        senderId: "user",
      });
    expect(response2.statusCode).not.toBe(201);

    const response3 = await request(app)
      .post(baseUrl + "/refreshToken")
      .send({
        refreshToken: testUser.refreshToken,
      });
    expect(response3.statusCode).toBe(200);
    testUser.accessToken = response3.body.accessToken;

    const response4 = await request(app)
      .post("/posts")
      .set({ authorization: "JWT " + testUser.accessToken })
      .send({
        title: "post",
        content: "content",
        senderId: "user",
      });
    expect(response4.statusCode).toBe(201);
  });
});
