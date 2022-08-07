const usernameRegEx = new RegExp(
  /^[a-zA-Z0-9\u0080-\u024F\s\/\-\)\(\,\.\"\?\!\'\€\:]+$/i
);

module.exports = (req, res, next) => {
  if (!usernameRegEx.test(req.body.username)) {
    res
      .writeHead(
        405,
        "Votre pseudo contient des caractères interdits pour des raisons de sécurité.",
        { "Content-type": "application/json" }
      )
      .end(
        "Votre pseudo contient des caractères interdits pour des raisons de sécurité."
      );
  } else {
    next();
  }
};
