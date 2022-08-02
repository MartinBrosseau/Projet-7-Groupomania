const passwordSchema = require("../models/password");

module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res
      .writeHead(
        405,
        "Le mot de passe ne respecte pas les exigences de sécurité",
        { "Content-type": "application/json" }
      )
      .end("Le mot de passe ne respecte pas les exigences de sécurité");
  } else {
    next();
  }
};
