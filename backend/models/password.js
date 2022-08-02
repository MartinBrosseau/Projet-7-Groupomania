const passwordValidator = require("password-validator");

// Créer un schéma
const passwordSchema = new passwordValidator();

// Lui ajouter les propriétés suivantes
passwordSchema
  .is()
  .min(8) // 8 caractères minimum
  .is()
  .max(50) //50 caractères maximum
  .has()
  .uppercase() // 1 majuscule minimum
  .has()
  .lowercase() // 1 minuscule minimum
  .has()
  .digits(1) // Au moins 1 chiffre
  .has()
  .not()
  .spaces() // Pas d'espaces
  .has()
  .symbols(); // Au moins 1 caractère spécial

module.exports = passwordSchema;
