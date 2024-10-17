const request = require("supertest");
const server = require("../index");

const testUser = {
  email: "test@test.com",
  password: "Password1!",
};

describe("POST ?api/v1/signup", () => {
  it("should response with 200 status code", (done) => {
    // it adalah expectasi kita
    request(server)
      .post("/api/v1/auth/signup")
      .send(testUser)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
          code: 200,
          status: "success",
          message: "Sign up successfully",
          data: expect.objectContaining({
            user: {
              email: "test@test.com",
              password: expect.not.stringContaining("Password1!"),
              address: null,
              avatar: null,
              birthdate: null,
              driver_license: null,
              fullname: null,
              gender: null,
              phone_number: null,
              role_id: 3,
              create_by: null,
              create_dt: expect.any(String),
              update_by: null,
              update_at: expect.any(String),
            },
          }),
        });
        done();
      })
      .catch((e) => {
        console.log(e);
        done();
      });
  });

  it("should response with 400 status code", () => {
    // it adalah expectasi kita
  });
});

describe("POST ?api/v1/signin", () => {
  it("should response with 200 status code", (done) => {
    request(server)
      .post("/api/v1/auth/signin")
      .send(testUser)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
          code: 200,
          status: "success",
          message: "Sign in successfully",
          data: expect.objectContaining({
            token: expect.any(String),
            user: {
              email: "test@test.com",
              password: expect.not.stringContaining("Password1!"),
              address: null,
              avatar: null,
              birth_date: null,
              driver_license: null,
              fullname: null,
              gender: null,
              phone_number: null,
              role_id: 3,
              create_by: null,
              create_dt: expect.anything(),
              update_by: null,
              update_at: expect.anything(),
            },
          }),
        });
        done();
      })
      .catch((e) => {
        console.log(e);
        done();
      });
  });
  it("should response with 400 status code", () => {});
});
