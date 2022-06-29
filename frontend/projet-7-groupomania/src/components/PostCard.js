import React from "react";
import DeletePost from "./DeletePost";
import NewComment from "./NewComment";
import LikePost from "./LikePost";
import PostCreator from "./PostCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const PostCard = ({ post, user, setAllPosts }) => {
  return (
    <div className="post-card" key={post.id}>
      <div className="post-header">
        <div className="post-header__user">
          <PostCreator postUserId={post.user_id} />
        </div>
        <div className="post-header__title">
          <h4>{post.title}</h4>
        </div>
        <div className="post-header__options">
          {post.user_id === user.id && (
            <DeletePost
              postId={post.id}
              postCreator={post.user_id}
              setAllPosts={setAllPosts}
            />
          )}
          <button className="options">
            {post.user_id === user.id && (
              <NavLink to="/modifypost">
                <FontAwesomeIcon icon={faPen} className="icone-option" />
              </NavLink>
            )}
          </button>
        </div>
      </div>

      <div className="post-body">
        <div className="post-body__description">
          <p>{post.description}</p>
        </div>
        <div className="post-body__container">
          <img
            className="post-body__container__image"
            src={post.imageUrl}
            alt="post"
          />
        </div>
      </div>

      <div className="post-footer">
        <div className="post-footer__reaction">
          <button className="like">
            <LikePost postId={post.id} />
          </button>
        </div>
        <div className="post-footer__reaction">
          <button className="comment">
            <NewComment postId={post.id} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
