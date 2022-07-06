import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { UserToken } from "./UserToken";
import axios from "axios";

const DeletePost = ({ postId, postCreator, setAllPosts }) => {
  const { token } = useContext(UserToken);

  const deletePost = () => {
    axios
      .delete("http://localhost:3000/api/post/deletePost", {
        headers: { authorization: `Bearer ${token}` },
        params: { postId, postCreator },
      })
      .then((res) => {
        setAllPosts((oldPosts) =>
          oldPosts.filter((post) => post.Id !== postId)
        );
      });
  };

  return (
    <button className="delete-post">
      <FontAwesomeIcon
        icon={faTrashCan}
        className="icone-option"
        onClick={deletePost}
      />
    </button>
  );
};

export default DeletePost;
