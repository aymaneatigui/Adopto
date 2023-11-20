const errorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {   res.status(401).json({ error: "Unauthorized" }); }
  else if (err.name === "ForbiddenError") { res.status(403).json({ error: "Forbidden" });    }
  else if (err.name === " NotFoundError") { res.status(404).json({ error: "NotFound" });     }
  else {                                    res.status(500).json({ error: "Internal Server Error" });    }

  next(err);
};
