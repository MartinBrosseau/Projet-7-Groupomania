import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { UserToken } from "./UserToken";
import axios from "axios";

const LikePost = ({ post }) => {
  const { token } = useContext(UserToken);
  const [likes, setLiked] = useState(false);

  const likePost = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/api/post/likePost", {
      headers: { authorization: `Bearer ${token}` },
      params: { postId: post.Id },
    });
  };

  return (
    <div className="like">
      <FontAwesomeIcon
        className="like__icone"
        icon={faThumbsUp}
        size="lg"
        onClick={likePost}
      />
    </div>
  );
};

export default LikePost;
