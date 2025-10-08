"use strict";
"use strict";

const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Demande = require("../models/Demande");
const { loginHandler, listDemandesHandler } = require("../routes/adminRoutes");

function createMockResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

describe("Admin authentication", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return a token on valid credentials", async () => {
    jest.spyOn(Admin, "findOne").mockResolvedValue({
      id: "admin-id",
      username: "admin",
      comparePassword: jest.fn().mockResolvedValue(true),
    });

    const req = { body: { username: "admin", password: "secure" } };
    const res = createMockResponse();

    await loginHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(typeof res.body.token).toBe("string");
  });

  it("should return demandes for authenticated admin", async () => {
    const demandes = [{ _id: "1", nom: "Client 1", createdAt: new Date().toISOString() }];

    const mockLean = jest.fn().mockResolvedValue(demandes);
    const mockSort = jest.fn().mockReturnValue({ lean: mockLean });
    jest.spyOn(Demande, "find").mockReturnValue({ sort: mockSort });

    const token = jwt.sign({ id: "admin-id", username: "admin" }, process.env.JWT_SECRET);

    const req = { headers: { authorization: `Bearer ${token}` }, admin: { id: "admin-id", username: "admin" } };
    const res = createMockResponse();

    await listDemandesHandler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
    expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
  });
});
