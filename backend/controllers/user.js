require('dotenv').config();
const bcrypt = require('bcrypt');//Bcrypt sert a hasher les mdp afin de les sécuriser
const jwt = require('jsonwebtoken');//Jsonwebtoken attribue un token a un utilisateur lorsqu'il se connecte


const TOKEN = process.env.TOKEN;

//Enregistrement d'un nouvel utilisateur
exports.signup = async (req, res, next) => {
  console.log(req)
  /*try {
      const userObject = JSON.parse(req.body.user)
      const hashedPassword = await bcrypt.hash(userObject.password, 10);

       const emailExist = await User.findOne({ where : { // SELECT * FROM users WHERE users.email = ${userObject.email}
          email: userObject.email
      }})
      if ( emailExist ) {
          return res.status(401).send({ error: "Adresse email déja enregistrée !"})
      } 
      await User.create({
          username: userObject.username,
          email: userObject.email,
          password: hashedPassword,
      })
      res.status(201).json({ message: 'Utilisateur créé' })
  } catch (err) {
      res.status(500).json( {message: 'Something went wrong'})
  }*/
}



//Connection d'un utilisateur existant
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              `${TOKEN}`,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};