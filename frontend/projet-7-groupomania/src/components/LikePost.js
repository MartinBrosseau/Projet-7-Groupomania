import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { UserToken } from "./UserToken";

const LikePost = ({ post, likesNumber, setLikesNumber, user }) => {
  const { token } = useContext(UserToken);
  const [liked, setLiked] = useState({
    user_id: user.id,
    post_id: post.Id,
  });

  const [likeButton, setLikeButton] = useState("emptyLike");
  const [likeCountStyle, setLikeCountStyle] = useState("notLiked");

  const likePost = () => {
    const data = liked;
    axios
      .post("http://localhost:3000/api/post/likePost", data, {
        headers: { authorization: `Bearer ${token}` },
        params: { postId: post.Id },
      })
      .then((res) => {
        const userLiked = res.data.userLiked;
        if (userLiked.length === 0) {
          setLikesNumber(++likesNumber);
          setLikeButton("filledLike");
          setLikeCountStyle("liked");
        } else {
          setLikesNumber(--likesNumber);
          setLikeButton("emptyLike");
          setLikeCountStyle("notLiked");
        }
      });
  };

  return (
    <button className="like-button">
      <FontAwesomeIcon
        className={likeButton}
        icon={faHeart}
        size="lg"
        onClick={(event) => {
          event.preventDefault();
          setLiked();
          likePost();
        }}
      />
      <div className={likeCountStyle}>{likesNumber}</div>
    </button>
  );
};

export default LikePost;
