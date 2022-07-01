require("dotenv").config();
const jwt = require("jsonwebtoken"); //Jsonwebtoken attribue un token a un utilisateur lorsqu'il se connecte
const mysql = require("mysql2"); //Pour intéragir avec notre base de donnée
const dataBaseConnection = require("../config/dataBase");
const TOKEN = process.env.TOKEN;

exports.createComment = (req, res, next) => {
  const postId = req.query.postId;
  const content = req.body.content;

  let saveComment =
    "INSERT INTO comments ( user_id, post_id, content) VALUES  ( ?, ?, ? )";
  let saveCommentValues = [req.auth.userId, postId, content];
  saveComment = mysql.format(saveComment, saveCommentValues);
  dataBaseConnection.query(saveComment, function (error, result) {
    if (error) {
      return res
        .status(400)
        .json({ error: "La création du commentaire a échouée" });
    } else {
      return res.status(200).json({ message: "Commentaire crée !" });
    }
  });
};

exports.getComments = (req, res, next) => {
  const postId = req.query.postId;
  let getComments = "SELECT * FROM comments WHERE comments.post_id = ?";
  let getCommentsValues = [postId];
  getComments = mysql.format(getComments, getCommentsValues);
  dataBaseConnection.query(getComments, function (error, result) {
    if (error) {
      return res
        .status(400)
        .json({ error: "Récupération des commentaires impossible" });
    } else {
      return res.status(200).json(result);
    }
  });
};

exports.modifyComment = (req, res, next) => {
  const commentId = req.params.id;
  const newContent = req.body.content;
  let commentCreator = "SELECT user_id FROM comments WHERE id = ?";
  let commentCreatorValues = [commentId];
  commentCreator = mysql.format(commentCreator, commentCreatorValues);
  dataBaseConnection.query(commentCreator, function (error, result) {
    if (commentCreator !== req.auth.userId) {
      return res.status(401).json({ error: "Ce n'est pas votre commentaire" });
    } else {
      let updatePost = "UPDATE comments SET content = ? WHERE id = ? ";
      let updatePostValues = [newContent, commentId];
      updatePost = mysql.format(updatePost, updatePostValues);
      dataBaseConnection.query(updatePost, function (error, result) {
        if (error) {
          return res.status(400).json({ error: "La modification a échouée" });
        } else {
          return res.status(200).json({ message: "Modification réussie" });
        }
      });
    }
  });
};

exports.deleteComment = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; //On récupère l'id utilisateur dans le token
  const decodedToken = jwt.verify(token, `${TOKEN}`);
  const userId = decodedToken.userId;
  const isAdmin = decodedToken.isAdmin;
  const commentId = req.params.id;

  if (isAdmin !== 0) {
    //Suppression par un modérateur
    let deleteComment = "DELETE FROM comments WHERE id = ?";
    let deleteCommentValues = [commentId];
    deleteComment = mysql.format(deleteComment, deleteCommentValues);
    dataBaseConnection.query(deleteComment, function (error, result) {
      if (error) {
        return res.status(400).json({ error: "La suppression a échouée" });
      } else {
        return res
          .status(200)
          .json({ message: "Commentaire supprimé par un modérateur" });
      }
    });
  } else {
    //Suppression par le créateur du commentaire
    let commentCreator = "SELECT user_id FROM comments WHERE id = ?";
    let commentCreatorValues = [commentId];
    commentCreator = mysql.format(commentCreator, commentCreatorValues);
    dataBaseConnection.query(commentCreator, function (error, result) {
      if (commentCreator !== req.auth.userId) {
        return res
          .status(401)
          .json({ error: "Ce n'est pas votre commentaire" });
      } else {
        let deleteComment = "DELETE FROM comments WHERE id = ?";
        let deleteCommentValues = [commentId];
        deleteComment = mysql.format(deleteComment, deleteCommentValues);
        dataBaseConnection.query(deleteComment, function (error, result) {
          if (error) {
            return res.status(400).json({ error: "La suppression a échouée" });
          } else {
            return res
              .status(200)
              .json({ message: "Commentaire supprimé par son créateur !" });
          }
        });
      }
    });
  }
};
