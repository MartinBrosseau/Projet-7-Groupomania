const commentRegEx = new RegExp(/^[a-zA-Z0-9\u0080-\u024F\s\/\-\)\(\,\.\"]+$/i);

module.exports = (req, res, next) => {
  if (!commentRegEx.test(req.body.content)) {
    res
      .writeHead(
        405,
        "Votre commentaire contient des caractères interdits pour des raisons de sécurité.",
        { "Content-type": "application/json" }
      )
      .end(
        "Votre commentaire contient des caractères interdits pour des raisons de sécurité."
      );
  } else {
    next();
  }
};
