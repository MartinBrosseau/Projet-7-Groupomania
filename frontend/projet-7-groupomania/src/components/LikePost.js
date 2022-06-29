import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { UserToken } from "./UserToken";
import axios from "axios";

const LikePost = (postId) => {
  const token = useContext(UserToken);
  const [likes, setLiked] = useState(false); // dynamic

  const likePost = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3000/api/post/likePost`, {
        headers: { authorization: `Bearer ${token}` },
        params: { postId },
      })
      .then(function (res) {
        setLiked(true);
      });
  };

  return (
    <div className="like" onClick={likePost}>
      <FontAwesomeIcon className="like__icone" icon={faThumbsUp} size="lg" />
    </div>
  );
};

export default LikePost;
