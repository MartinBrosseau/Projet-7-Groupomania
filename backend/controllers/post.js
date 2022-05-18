require('dotenv').config();
const jwt = require('jsonwebtoken');//Jsonwebtoken attribue un token a un utilisateur lorsqu'il se connecte




exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
  };