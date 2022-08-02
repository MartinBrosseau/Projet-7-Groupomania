const emailRegEx = new RegExp(
  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
);

module.exports = (req, res, next) => {
  if (!emailRegEx.test(req.body.email)) {
    res
      .writeHead(
        405,
        "Votre addresse mail ne respecte pas le format email classique.",
        { "Content-type": "application/json" }
      )
      .end("Votre addresse mail ne respecte pas le format email classique.");
  } else {
    next();
  }
};
