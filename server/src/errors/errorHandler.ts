const errorHandler = (err, req, res, next) => {
  if (err.name === "BadRequestError") {
    res.status(400).json({ error: err.message });
  } else if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.message });
  } else if (err.name === "ForbiddenError") {
    res.status(403).json({ error: err.message });
  } else if (err.name === " NotFoundError") {
    res.status(404).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }

  next(err);
};

export default errorHandler;
