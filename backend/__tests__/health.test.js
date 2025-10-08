"use strict";

const { healthHandler } = require("../routes/healthRoutes");

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

describe("GET /api/healthz", () => {
  it("should return service status", async () => {
    const res = createMockResponse();
    healthHandler({}, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
