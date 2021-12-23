module.exports = (error, req, res, next) => {
  const message = error.message || "Internal server Error";
  const status = error.status || 500;
  res.status(status).send(message);
};
