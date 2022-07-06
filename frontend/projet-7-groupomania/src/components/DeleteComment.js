import axios from "axios";
import React, { useContext } from "react";
import { UserToken } from "./UserToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const DeleteComment = ({ comment, setAllComments, commentId }) => {
  const { token } = useContext(UserToken);

  const deleteComment = () => {
    axios
      .delete("http://localhost:3000/api/comment/deleteComment", {
        headers: { authorization: `Bearer ${token}` },
        params: { commentId: comment.ID },
      })
      .then((res) => {
        setAllComments((oldComments) =>
          oldComments.filter((comment) => comment.ID !== commentId)
        );
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
