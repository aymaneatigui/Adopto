const errorHandler = (err, req, res, next) => {
  if (err.name === "BadRequestError") {
    res.status(400).json({ status: "error", message: err.message });
  } else if (err.name === "UnauthorizedError") {
    res.status(401).json({ status: "error", message: err.message });
  } else if (err.name === "ForbiddenError") {
    res.status(403).json({ status: "error", message: err.message });
  } else if (err.name === " NotFoundError") {
    res.status(404).json({ status: "error", message: err.message });
  } else {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }

  next(err);
};

export default errorHandler;
