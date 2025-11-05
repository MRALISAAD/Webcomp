export const validate = (schema, property = "body") => async (req, res, next) => {
  try {
    if (schema && typeof schema.safeParseAsync === "function") {
      const result = await schema.safeParseAsync(req[property]);
      if (!result.success) {
        return res.status(422).json({
          error: "Validation error",
          details: result.error.errors.map((issue) => ({
            message: issue.message,
            path: issue.path,
          })),
        });
      }
      req[property] = result.data;
      return next();
    }

    const value = await schema.validateAsync(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });
    req[property] = value;
    return next();
  } catch (err) {
    if (err.isJoi) {
      return res.status(422).json({
        error: err.details.map(({ message, path }) => ({ message, path })),
      });
    }
    return next(err);
  }
};
