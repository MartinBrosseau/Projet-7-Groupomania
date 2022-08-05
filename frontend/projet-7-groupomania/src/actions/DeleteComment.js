import axios from "axios";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const DeleteComment = ({
  comment,
  setAllComments,
  commentId,
  setCommentsNumber,
  post,
}) => {
  const token = sessionStorage.getItem("token");
  const deleteComment = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/comment/deleteComment`, {
        headers: { authorization: `Bearer ${token}` },
        params: { commentId: comment.ID },
      })
      .then((res) => {
        setAllComments((oldComments) =>
          oldComments.filter((comment) => comment.ID !== commentId)
        );
      })
      .then((res) => {
        setCommentsNumber(--post.comments_number);
      });
  };
  return (
    <button className="delete-comment">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="icone-option"
        onClick={deleteComment}
      />
    </button>
  );
};

export default DeleteComment;
