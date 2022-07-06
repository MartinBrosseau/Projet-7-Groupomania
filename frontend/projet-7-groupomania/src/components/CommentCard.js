import React from "react";
import ModifyComment from "./ModifyComment";
import DeleteComment from "./DeleteComment";

const CommentCard = ({ comment, user, post, setAllComments }) => {
  return (
    <div className="comment-card">
      <div className="comment-header">
        <h5>
          {comment.username} <small>a réagi</small>
        </h5>
      </div>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-options">
        {comment.user_id === user.id ||
          (user.admin !== 0 && (
            <div className="comment-options__modify">
              <ModifyComment comment={comment} user={user} post={post} />
            </div>
          ))}
        {comment.user_id === user.id && (
          <div className="comment-options__delete">
            <DeleteComment
              comment={comment}
              user={user}
              post={post}
              setAllComments={setAllComments}
              commentId={comment.ID}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
