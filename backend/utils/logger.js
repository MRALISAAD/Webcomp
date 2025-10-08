"use strict";

/* eslint-disable no-console */
const logger = {
  info: (...messages) => console.log("[INFO]", ...messages),
  warn: (...messages) => console.warn("[WARN]", ...messages),
  error: (...messages) => console.error("[ERROR]", ...messages),
};
/* eslint-enable no-console */

module.exports = logger;
