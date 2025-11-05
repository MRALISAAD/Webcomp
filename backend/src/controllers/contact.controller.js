import { handleContactSubmission } from "../services/contact.service.js";

export async function postContact(req, res, next) {
  try {
    const result = await handleContactSubmission(req.body);
    return res.status(201).json({
      success: true,
      message: "Message transmis avec succès.",
      ...result,
    });
  } catch (error) {
    if (!error.status) {
      error.status = 502;
    }
    error.publicMessage = "Impossible d'envoyer votre message pour le moment. Merci de réessayer dans quelques instants.";
    return next(error);
  }
}
