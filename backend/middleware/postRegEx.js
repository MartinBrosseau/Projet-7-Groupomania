const postRegEx = new RegExp(
  /^[a-zA-Z0-9\u0080-\u024F\s\/\-\)\(\,\.\"\?\!\'\€\:]+$/i
);

module.exports = (req, res, next) => {
  if (
    !postRegEx.test(req.body.description) ||
    !postRegEx.test(req.body.title)
  ) {
    res
      .writeHead(
        405,
        "Votre post contient des caractères interdits pour des raisons de sécurité.",
        { "Content-type": "application/json" }
      )
      .end(
        "Votre post contient des caractères interdits pour des raisons de sécurité."
      );
  } else {
    next();
  }
};
