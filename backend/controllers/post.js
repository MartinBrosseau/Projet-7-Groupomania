require("dotenv").config();
const jwt = require("jsonwebtoken"); //Jsonwebtoken attribue un token a un utilisateur lorsqu'il se connecte
const mysql = require("mysql2"); //Pour intéragir avec notre base de donnée
const dataBaseConnection = require("../config/dataBase");
const TOKEN = process.env.TOKEN;
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const postTitle = req.body.title;
  const postDescription = req.body.description;
  let imgUrl = "";
  if (req.file) {
    imgUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  let savePost =
    "INSERT INTO posts (user_id, description, imageUrl, title) VALUES (?, ?, ?, ?)";
  let savePostValues = [req.auth.userId, postDescription, imgUrl, postTitle];
  savePost = mysql.format(savePost, savePostValues);
  dataBaseConnection.query(savePost, function (error, result) {
    if (error) {
      return res.status(400).json({ error: "La création du post a échouée !" });
    } else {
      return res.status(201).json({ message: "Nouveau post crée !" });
    }
  });
};

exports.modifyPost = (req, res, next) => {
  const postId = req.params.id;
  const postImg = req.file;
  const postTitle = req.body.title;
  const postDescription = req.body.description;
  let imgUrl = "";

  let postCreator = "SELECT user_id FROM POSTS";
  dataBaseConnection.query(postCreator, function (error, result) {
    if (postCreator !== req.auth.userId) {
      return res.status(401).json({ error: "Ce n'est pas votre post !" });
    } else {
      if (postImg) {
        imgUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      }
      let previousImg = "SELECT imageUrl FROM posts WHERE id = ?";
      let previousImgValues = [postId];
      previousImg = mysql.format(previousImg, previousImgValues);
      let updatePost =
        "UPDATE posts SET description = ?, imageUrl = ?, title = ? WHERE id = ?";
      let updatePostValues = [postDescription, imgUrl, postTitle, postId];
      updatePost = mysql.format(updatePost, updatePostValues);
      dataBaseConnection.query(previousImg, function (error, result) {
        if (error) {
          return res
            .status(400)
            .json({ error: "Suppression de l'image échouée" });
        } else {
          let previousImgUrl = result[0].imageUrl;
          if (previousImgUrl !== "") {
            const filename = previousImgUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {});
          } else {
            console.log("Pas d'image !");
          }
          dataBaseConnection.query(updatePost, function (error, result) {
            if (error) {
              return res
                .status(400)
                .json({ error: "Echec de la modification" });
            } else {
              return res.status(200).json({ message: "Post modifié !" });
            }
          });
        }
      });
    }
  });
};

exports.deletePost = (req, res, next) => {
  if (req.auth.isAdmin !== 0) {
    //Suppression par un moderateur
    let postImg = "SELECT imageUrl FROM posts where id = ?";
    let postImgValues = [postId];
    postImg = mysql.format(postImg, postImgValues);
    let deletePost = "DELETE FROM posts WHERE id = ?";
    let deletePostValues = [postId];
    deletePost = mysql.format(deletePost, deletePostValues);
    dataBaseConnection.query(postImg, function (error, result) {
      if (error) {
        return res
          .status(400)
          .json({ error: "La suppression de l'image a échouée" });
      } else {
        let imgUrl = result[0].imageUrl;
        if (imgUrl !== "") {
          const filename = imgUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {});
        } else {
          console.log("Pas d'image");
        }

        dataBaseConnection.query(deletePost, function (error, result) {
          if (error) {
            return res.status(400).json({ error: "La suppression a échouée" });
          } else {
            return res
              .status(200)
              .json({ message: "Post supprimé par un modérateur" });
          }
        });
      }
    });
  } else {
    let postCreator = "SELECT user_id FROM POSTS";
    dataBaseConnection.query(postCreator, function (error, result) {
      if (postCreator !== req.auth.userId) {
        return res.status(401).json({ error: "Ce n'est pas votre post !" });
      } else {
        //Suppression par le créateur du post
        const postId = req.params.id;
        let postImg = "SELECT imageUrl FROM posts where id = ?";
        let postImgValues = [postId];
        postImg = mysql.format(postImg, postImgValues);
        let deletePost = "DELETE * FROM posts WHERE id = ?";
        let deletePostValues = [postId];
        deletePost = mysql.format(deletePost, deletePostValues);
        dataBaseConnection.query(postImg, function (error, result) {
          if (error) {
            return res.status(400).json({ error: "La suppression a échouée" });
          } else {
            let imgUrl = result[0].imageUrl;
            if (imgUrl !== "") {
              const filename = imgUrl.split("/images/")[1];
              fs.unlink(`images/${filename}`, () => {});
            } else {
              console.log("Pas d'image");
            }
            dataBaseConnection.query(deletePost, function (error, result) {
              if (error) {
                return res
                  .status(400)
                  .json({ error: "La suppression du post a échouée" });
              } else {
                return res
                  .status(200)
                  .json({ message: "Post supprimé par l'utilisateur" });
              }
            });
          }
        });
      }
    });
  }
};

exports.getAllPosts = (req, res, next) => {
  let allPosts = "SELECT title, imageUrl, description FROM posts";
  allPosts = mysql.format(allPosts);
  dataBaseConnection.query(allPosts, function (error, result) {
    if (error) {
      return res
        .status(400)
        .json({ error: "Impossible de récupérer les posts" });
    } else {
      return res
        .status(200)
        .json({ message: "Récupération des posts réussie" });
    }
  });
};

exports.getOnePost = (req, res, next) => {
  const postId = req.params.id;
  let onePost = "SELECT * FROM posts WHERE id = ?";
  let onePostValues = [postId];
  onePost = mysql.format(onePost, onePostValues);
  dataBaseConnection.query(onePost, function (error, result) {
    if (error) {
      return res.status(400).json({ error: "Impossible de récupérer ce post" });
    } else {
      return res.status(200).json({ message: "Récupération du post réussie" });
    }
  });
};

exports.getPostsByUser = (req, res, next) => {
  let postsByUser = "SELECT * FROM posts WHERE user_id = ?";
  let postsByUserValues = [req.auth.userId];
  postsByUser = mysql.format(postsByUser, postsByUserValues);
  dataBaseConnection.query(postsByUser, function (error, result) {
    if (error) {
      return res
        .status(400)
        .json({ error: "Impossible de récupérer les posts de l'utilisateur" });
    } else {
      return res.status(200).json({ message: "Récupération réussie !" });
    }
  });
};

exports.likePost = (req, res, next) => {
  const like = req.body.like;
  const postId = req.body.id;
  let alreadyliked = "SELECT * FROM likes WHERE userId = ? AND postId = ?";
  let alreadylikedValues = [req.auth.userId, postId];
  alreadyliked = mysql.format(alreadyliked, alreadylikedValues);
  dataBaseConnection.query(alreadyliked, function (error, result) {});

  if (like === 1 && alreadyliked === null) {
    let addLike = "INSERT INTO likes (userId, postId) VALUES (?, ?)";
    let addlikeValues = [req.auth.userId, postId];
    addLike = mysql.format(addLike, addlikeValues);
    dataBaseConnection.query(addLike, function (error, result) {
      if (error) {
        return res.status(400).json({ error: "Impossible de like le post" });
      } else {
        return res.status(200).json({ message: "Like ajouté !" });
      }
    });
  } else {
    return res.status(400).json({ error: "Vous avez déja like ce post !" });
  }

  if (like === 0 && alreadyliked !== null) {
    let deleteLike = "DELETE FROM likes (userId, postId) VALUES (?, ?)";
    let deleteLikeValues = [req.auth.userId, postId];
    deleteLike = mysql.format(deleteLike, deleteLikeValues);
    dataBaseConnection.query(deleteLike, function (error, result) {
      if (error) {
        return res.status(400).json({ error: "Annulation du like impossible" });
      } else {
        return res.status(200).json({ message: "Like supprimé !" });
      }
    });
  } else {
    return res
      .status(400)
      .json({ error: "Vous ne pouvez pas annuler ce like" });
  }
};
