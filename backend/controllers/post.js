require("dotenv").config();
const mysql = require("mysql2"); //Pour intéragir avec notre base de donnée
const dataBaseConnection = require("../config/dataBase");
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
  const postId = req.query.currentPostId;
  const userId = req.auth.userId;
  console.log(userId);
  console.log(postId);
  const postImg = req.file;
  const postTitle = req.body.title;
  const postDescription = req.body.description;
  let imgUrl = "";

  let postCreator = "SELECT user_id FROM posts WHERE posts.Id = ?";
  let postCreatorValues = [postId];
  postCreator = mysql.format(postCreator, postCreatorValues);
  dataBaseConnection.query(postCreator, function (error, result) {
    console.log(result[0].user_id);
    if (result[0].user_id !== userId) {
      return res.status(401).json({ error: "Ce n'est pas votre post !" });
    } else {
      if (postImg) {
        imgUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      }
      let previousImg = "SELECT imageUrl FROM posts WHERE Id = ?";
      let previousImgValues = [postId];
      previousImg = mysql.format(previousImg, previousImgValues);
      let updatePost =
        "UPDATE posts SET description = ?, imageUrl = ?, title = ? WHERE Id = ?";
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
  const postId = Number(req.query.postId);
  const postCreator = Number(req.query.postCreator);

  if (req.auth.isAdmin !== 0) {
    //Suppression par un moderateur
    let postImg = "SELECT imageUrl FROM posts where Id = ?";
    let postImgValues = [postId];
    postImg = mysql.format(postImg, postImgValues);
    let deletePost = "DELETE * FROM posts WHERE Id = ?";
    let deletePostValues = [postId];
    deletePost = mysql.format(deletePost, deletePostValues);
    dataBaseConnection.query(postImg, function (error, image) {
      if (error) {
        return res
          .status(400)
          .json({ error: "La suppression de l'image a échouée" });
      } else {
        let imgUrl = image[0].imageUrl;
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
              .json({ error: "La suppression a échouée !" });
          } else {
            return res
              .status(200)
              .json({ message: "Post supprimé par un modérateur" });
          }
        });
      }
    });
  }

  if (req.auth.userId !== postCreator) {
    //Suppression par le créateur du post
    return res.status(401).json({ error: "Ce n'est pas votre post !" });
  } else {
    let postImg = "SELECT imageUrl FROM posts where Id = ?";
    let postImgValues = [postId];
    postImg = mysql.format(postImg, postImgValues);
    let deletePost = "DELETE FROM posts WHERE posts.Id = ? ";
    let deletePostValues = [postId];
    deletePost = mysql.format(deletePost, deletePostValues);
    dataBaseConnection.query(postImg, function (error, image) {
      if (error) {
        return res
          .status(400)
          .json({ error: "La récupération de l'image a échouée" });
      } else {
        console.log(image);
        let imgUrl = image[0].imageUrl;
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
};

exports.getAllPosts = (req, res, next) => {
  let allPosts = "SELECT * FROM posts, users WHERE posts.user_id = users.id";
  dataBaseConnection.query(allPosts, function (error, result) {
    if (error) {
      console.log(error);
      return res
        .status(400)
        .json({ error: "Impossible de récupérer les posts" });
    } else {
      console.log(result);
      return res.status(200).json(result);
    }
  });
};

exports.getOnePost = (req, res, next) => {
  const postId = req.params.id;
  let onePost =
    "SELECT * FROM posts, users WHERE Id = ? AND posts.user_id = users.id";
  let onePostValues = [postId];
  onePost = mysql.format(onePost, onePostValues);
  dataBaseConnection.query(onePost, function (error, result) {
    if (error) {
      return res.status(400).json({ error: "Impossible de récupérer ce post" });
    } else {
      return res.status(200).json(result);
    }
  });
};

exports.getPostsByUser = (req, res, next) => {
  let postsByUser =
    "SELECT * FROM posts, users WHERE user_id = ? AND posts.user_id = users.id";
  let postsByUserValues = [req.auth.userId];
  postsByUser = mysql.format(postsByUser, postsByUserValues);
  dataBaseConnection.query(postsByUser, function (error, result) {
    if (error) {
      return res
        .status(400)
        .json({ error: "Impossible de récupérer les posts de l'utilisateur" });
    } else {
      return res.status(200).json(result);
    }
  });
};

exports.likePost = (req, res, next) => {
  const like = req.body.like;
  const postId = req.params.postId;
  const userId = req.auth.userId;
  let alreadyliked = "SELECT * FROM likes WHERE userId = ? AND posts.Id = ?";
  let alreadylikedValues = [req.auth.userId, postId];
  alreadyliked = mysql.format(alreadyliked, alreadylikedValues);
  dataBaseConnection.query(alreadyliked, function (error, result) {});

  if (like === 1 && alreadyliked === null) {
    let addLike = "INSERT INTO likes (user_id, post_id) VALUES (?, ?)";
    let addlikeValues = [userId, postId];
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
    let deleteLike = "DELETE FROM likes (user_id, post_id) VALUES (?, ?)";
    let deleteLikeValues = [userId, postId];
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

exports.postCreator = (req, res, next) => {
  const userId = req.query.postUserId;
  let getPostCreator = "SELECT username FROM users WHERE users.id = ?";
  let getPostCreatorValues = [userId];
  getPostCreator = mysql.format(getPostCreator, getPostCreatorValues);
  dataBaseConnection.query(getPostCreator, function (error, result) {
    if (error) {
      return res.status(400).json({ message: "récupération impossible" });
    } else {
      return res.status(200).json(result);
    }
  });
};
