import React, { useState } from "react";
import DeletePost from "./DeletePost";
import Comments from "./Comments";
import LikePost from "./LikePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faMessage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PostCard = ({ post, user, setAllPosts }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentsNumber, setCommentsNumber] = useState(post.comments_number);
  const [likesNumber, setLikesNumber] = useState(post.likes_number);

  return (
    <div className="post-card" key={post.id}>
      <div className="post-header">
        <div className="post-header__user">
          <h4>
            {post.post_creator} <small>a posté</small>
          </h4>
        </div>
        <div className="post-header__title">
          <h4>{post.title}</h4>
        </div>
        <div className="post-header__options">
          {post.user_id === user.id && (
            <DeletePost
              postId={post.Id}
              postCreator={post.user_id}
              setAllPosts={setAllPosts}
            />
          )}

          {post.user_id === user.id && (
            <button className="post-header__options__modify">
              <Link
                to="/modifypost"
                state={{
                  title: post.title,
                  img: post.imageUrl,
                  description: post.description,
                  postId: post.Id,
                }}
              >
                <FontAwesomeIcon icon={faPen} className="icone-option" />
              </Link>
            </button>
          )}
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
          <div className="like">
            <LikePost
              post={post}
              user={user}
              likesNumber={likesNumber}
              setLikesNumber={setLikesNumber}
            />
          </div>
        </div>
        <div className="post-footer__reaction">
          <div className="comment">
            <div className="comment__number">{commentsNumber}</div>
            <FontAwesomeIcon
              className="comment__icone"
              icon={faMessage}
              size="lg"
              onClick={() => setShowComments(!showComments)}
            />
          </div>
          <div className="show-comments">
            {showComments && (
              <Comments
                post={post}
                user={user}
                setCommentsNumber={setCommentsNumber}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
