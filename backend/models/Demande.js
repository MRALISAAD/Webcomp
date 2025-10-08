"use strict";

const mongoose = require("mongoose");

const demandeSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    telephone: {
      type: String,
      required: true,
      trim: true,
    },
    dateArrivee: {
      type: Date,
      required: true,
    },
    service: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    consentements: {
      type: new mongoose.Schema(
        {
          termsAccepted: {
            type: Boolean,
            default: false,
          },
          whatsappOptIn: {
            type: Boolean,
            default: false,
          },
        },
        { _id: false }
      ),
      default: () => ({
        termsAccepted: false,
        whatsappOptIn: false,
      }),
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
    collection: "demandes",
  }
);

module.exports = mongoose.model("Demande", demandeSchema);
