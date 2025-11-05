let totalRequests = 0;

export function requestCounter(req, res, next) {
  totalRequests += 1;
  res.setHeader("X-Request-Count", String(totalRequests));
  req.requestCount = totalRequests;
  return next();
}

export function getRequestCount() {
  return totalRequests;
}

