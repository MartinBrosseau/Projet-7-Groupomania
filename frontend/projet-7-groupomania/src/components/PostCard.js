import React, { useEffect, useState, useContext } from "react";
import { UserToken } from "./UserToken";
import { DeletePost } from "./DeletePost";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostCard = ({ post }) => {
  const { token } = useContext(UserToken);
  const [userProfil, setUserProfil] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/userProfil", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setUserProfil(res.data));
  }, [token]);

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-header__user">
          <h4>{post.username}</h4>
        </div>
        <div className="post-header__title">
          <h4>{post.title}</h4>
        </div>
        <div className="post-header__options">
          <button className="options">
            {post.user_id === userProfil.id ? <DeletePost /> : ""}
          </button>
          <button className="options">
            {post.user_id === userProfil.id ? (
              <FontAwesomeIcon
                icon={faPen}
                className="icone-option"
                size="lg"
              />
            ) : (
              ""
            )}
          </button>
        </div>
      </div>

      <div className="post-body">
        <div className="post-description">
          <p>{post.description}</p>
        </div>
        <div className="post-image">
          <img src={post.imageUrl} alt="post" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
