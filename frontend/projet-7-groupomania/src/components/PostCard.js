import React, { useState } from "react";
import DeletePost from "../actions/DeletePost";
import Comments from "../actions/Comments";
import LikePost from "../actions/LikePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faMessage,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PostCard = ({ post, user, setAllPosts }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentsNumber, setCommentsNumber] = useState(post.comments_number);
  const [likesNumber, setLikesNumber] = useState(post.likes_number);
  const timeStamp = post.creationDate;
  const dateFormat = (timeStamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(timeStamp).toLocaleDateString(undefined, options);
  };

  return (
    <div className="post-card" key={post.id}>
      <div className="post-header">
        <div className="post-header__infos">
          <div className="post-header__user">
            <h4>
              {post.post_creator} <small>a posté </small> {post.title}
            </h4>
          </div>
          <div className="post-header__timestamp">
            <h4>
              <small>le {dateFormat(timeStamp)}</small>
            </h4>
          </div>
        </div>

        <div className="post-header__options">
          {post.user_id === user.id && (
            <div className="post-header__options__delete">
              <DeletePost
                postId={post.Id}
                postCreator={post.user_id}
                setAllPosts={setAllPosts}
              />
            </div>
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
          {post.imageUrl ? (
            <img
              className="post-body__container__image"
              src={post.imageUrl}
              alt="post"
            />
          ) : (
            ""
          )}
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

          <div className={"show-comments"}>
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
      {showComments && (
        <div className="hide-comments">
          <FontAwesomeIcon
            icon={faArrowUpFromBracket}
            size="lg"
            onClick={() => setShowComments(false)}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
