function errorHandlerMiddleware(err, req, res, next) {
  console.log('In the error handler', err.status, err.message);
  if (!err.status) {
    //other error
    return res.status(500).send({ error: 'internal server error' });
  }
  return res.status(err.status).send(err.message);
}

module.exports = { errorHandlerMiddleware };
