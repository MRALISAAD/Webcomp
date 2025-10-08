const axios = require("axios");
const { handleContact } = require("../routes/contact");

function createMockRes() {
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

describe("/api/contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.post.mockResolvedValue({ data: { data: [{ code: "SUCCESS", details: { id: "lead-123" } }] } });
  });

  it("ignore honeypot submissions", async () => {
    const req = { body: { marhababot: "bot", fullName: "Test", email: "bot@test.dev", project: "Travail" } };
    const res = createMockRes();

    await handleContact(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Merci !" });
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("validates required fields", async () => {
    const req = { body: { email: "foo@test.dev" } };
    const res = createMockRes();

    await handleContact(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Champs invalides");
  });

  it("creates Zoho lead and sends emails", async () => {
    const req = {
      body: {
        fullName: "Ali Saad",
        email: "mr.alisaad@outlook.fr",
        project: "Travail",
        whatsapp: "5146910262",
        city: "Casablanca",
        arrivalDate: "2025-05-01",
        needs: ["Logement", "Démarches"],
        message: "Je veux réserver un transport VIP 🚗",
      },
    };
    const res = createMockRes();

    await handleContact(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.lead_id).toBe("lead-123");

    const [[url, payload]] = axios.post.mock.calls;
    expect(url).toContain("/Leads");
    expect(payload.data[0]).toMatchObject({
      Last_Name: "Ali",
      Email: "mr.alisaad@outlook.fr",
      Project_Type: "Travail",
    });

    expect(global.__sendMailMock).toHaveBeenCalledTimes(2);
  });
});
