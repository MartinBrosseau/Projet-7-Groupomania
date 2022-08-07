import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const DeletePost = ({ postId, postCreator, setAllPosts, isAdmin }) => {
  const token = sessionStorage.getItem("token");

  const deletePost = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/post/deletePost`, {
        headers: { authorization: `Bearer ${token}` },
        params: { postId, postCreator, isAdmin },
      })
      .then((res) => {
        setAllPosts((oldPosts) =>
          oldPosts.filter((post) => post.Id !== postId)
        );
      });
  };

  return (
    <button
      className="delete-post"
      aria-label="delete post"
      onClick={deletePost}
    >
      <FontAwesomeIcon icon={faTrashCan} className="icone-option" />
    </button>
  );
};

export default DeletePost;
