const request = require('supertest');

jest.mock('@sendgrid/mail', () => {
  const send = jest.fn();
  return {
    __esModule: true,
    setApiKey: jest.fn(),
    send,
    __mockedSend: send,
  };
});

const sgMail = require('@sendgrid/mail');
const sendMailMock = sgMail.__mockedSend;

process.env.MAIL_USER = 'MARHABA.CANADA@OUTLOOK.COM';
process.env.SENDGRID_API_KEY = 'SG.fake-key';

const app = require('./server');

beforeEach(() => {
  sendMailMock.mockReset();
  sgMail.setApiKey.mockClear();
  sendMailMock.mockResolvedValue();
  process.env.MAIL_USER = 'MARHABA.CANADA@OUTLOOK.COM';
  process.env.SENDGRID_API_KEY = 'SG.fake-key';
});

describe('POST /api/contact', () => {
  const basePayload = {
    nom: 'John Doe',
    email: 'MARHABA.CANADA@OUTLOOK.COM',
    telephone: '+1 514 555 1234',
    dateArrivee: '2024-05-20',
    heureArrivee: '15:30',
    compagnie: 'Air Canada',
    numeroVol: 'AC123',
    villeDepart: 'Casablanca',
    bagages: '2 valises',
    personnes: '2 personnes',
    assistanceSpeciale: ['enfant'],
    adresse: '123 Rue Sherbrooke, Montreal',
    logementReserve: 'oui',
    langue: 'fr',
    service: 'Transport VIP',
    servicesAdditionnels: ['transport', 'carteSim'],
    paiement: 'Carte de credit',
    acompte: 'oui',
    message: 'Merci pour votre aide!',
  };

  test('retourne success=true et confirmation pour une requete valide complete', async () => {
    const response = await request(app).post('/api/contact').send(basePayload);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ success: true });
    expect(response.body.confirmation).toBeTruthy();
    expect(sendMailMock).toHaveBeenCalledTimes(2);
  });

  test('retourne 400 si le nom est manquant', async () => {
    const { nom, ...payloadSansNom } = basePayload;

    const response = await request(app).post('/api/contact').send(payloadSansNom);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain('nom');
  });

  test("retourne 400 si l'email est manquant", async () => {
    const { email, ...payloadSansEmail } = basePayload;

    const response = await request(app).post('/api/contact').send(payloadSansEmail);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain('email');
  });

  test('retourne 400 si la date d\'arrivee est manquante', async () => {
    const { dateArrivee, ...payloadSansDate } = basePayload;

    const response = await request(app).post('/api/contact').send(payloadSansDate);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain('date');
  });

  test('accepte les champs facultatifs manquants', async () => {
    const minimalPayload = {
      nom: 'Jane Doe',
      email: 'MARHABA.CANADA@OUTLOOK.COM',
      dateArrivee: '2024-06-02',
    };

    const response = await request(app).post('/api/contact').send(minimalPayload);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(sendMailMock).toHaveBeenCalledTimes(2);
  });

  test("retourne 500 quand l'envoi email echoue", async () => {
    sendMailMock.mockRejectedValueOnce(new Error('Invalid API key'));

    const response = await request(app).post('/api/contact').send(basePayload);

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('reessayer');
  });
});
