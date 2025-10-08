"use strict";

let mockedAxiosInstance;

const mockSendMail = jest.fn(() => Promise.resolve());
const mockCreateTransport = jest.fn(() => ({
  sendMail: mockSendMail,
}));

global.__sendMailMock = mockSendMail;
global.__createTransportMock = mockCreateTransport;

jest.mock(
  "nodemailer",
  () => ({
    createTransport: mockCreateTransport,
  }),
  { virtual: true }
);

jest.mock(
  "axios",
  () => {
    mockedAxiosInstance = {
      post: jest.fn(() => Promise.resolve({ data: { data: [{ details: { id: "lead-123" }, code: "SUCCESS" }] } })),
    };
    return mockedAxiosInstance;
  },
  { virtual: true }
);

jest.mock(
  "zod",
  () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i;

    const makeString = () => {
      const config = { min: 0, email: false, optional: false };
      const api = {
        _type: "string",
        _config: config,
        min(len) {
          config.min = len;
          return api;
        },
        email() {
          config.email = true;
          return api;
        },
        optional() {
          config.optional = true;
          return api;
        },
      };
      return api;
    };

    const makeEnum = (values) => ({
      _type: "enum",
      values,
    });

    const makeArray = (schema) => {
      const api = {
        _type: "array",
        schema,
        optionalFlag: false,
        optional() {
          api.optionalFlag = true;
          return api;
        },
      };
      return api;
    };

    const object = (shape) => ({
      safeParse(data = {}) {
        const errors = [];

        const validate = (schema, value, key) => {
          if (schema._type === "string") {
            const { min, email, optional } = schema._config;
            if ((value === undefined || value === null || value === "") && optional) {
              return true;
            }
            if (typeof value !== "string") return false;
            if (value.length < min) return false;
            if (email && !emailRegex.test(value)) return false;
            return true;
          }
          if (schema._type === "enum") {
            return typeof value === "string" && schema.values.includes(value);
          }
          if (schema._type === "array") {
            if (schema.optionalFlag && (value === undefined || value === null)) {
              return true;
            }
            if (!Array.isArray(value)) return false;
            return value.every((item) => typeof item === "string");
          }
          return true;
        };

        for (const [key, schema] of Object.entries(shape)) {
          const value = data[key];
          const isOptional =
            schema._config?.optional === true || schema.optionalFlag === true || schema.optional === true;
          if ((value === undefined || value === null) && isOptional) {
            continue;
          }
          if (!validate(schema, value, key)) {
            errors.push(`Invalid field: ${key}`);
          }
        }

        if (errors.length) {
          return {
            success: false,
            error: {
              flatten: () => ({ formErrors: errors, fieldErrors: {} }),
            },
          };
        }

        return { success: true, data };
      },
    });

    return {
      z: {
        string: makeString,
        enum: makeEnum,
        array: makeArray,
        object,
      },
    };
  },
  { virtual: true }
);

const mockedAxios = () => mockedAxiosInstance;

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
process.env.ZOHO_BASE_URL = process.env.ZOHO_BASE_URL || "https://www.zohoapis.com/crm/v2";
process.env.ZOHO_OAUTH_TOKEN = process.env.ZOHO_OAUTH_TOKEN || "1000.test-token";
process.env.ZOHO_MODULE = process.env.ZOHO_MODULE || "Leads";
process.env.SMTP_HOST = process.env.SMTP_HOST || "smtp.test";
process.env.SMTP_USER = process.env.SMTP_USER || "no-reply@test.dev";
process.env.SMTP_PASS = process.env.SMTP_PASS || "secret";
process.env.REPLY_FROM = process.env.REPLY_FROM || "Marhaba Canada <no-reply@test.dev>";
process.env.MAIL_ADMIN = process.env.MAIL_ADMIN || "admin@test.dev";

afterEach(() => {
  mockSendMail.mockClear();
  mockCreateTransport.mockClear();
  if (mockedAxiosInstance) {
    mockedAxiosInstance.post.mockReset();
  }
  jest.clearAllMocks();
});
