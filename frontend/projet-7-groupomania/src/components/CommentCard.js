import React from "react";
import DeleteComment from "../actions/DeleteComment";

const CommentCard = ({
  comment,
  user,
  post,
  setAllComments,
  setCommentsNumber,
}) => {
  return (
    <div className="comment-card">
      <div className="comment-header">
        <h5>
          {comment.username}
          <small> a réagi</small>
        </h5>
      </div>
      <div className="comment-core">
        <div className="comment-content">{comment.content}</div>
        <div className="comment-options">
          {comment.user_id === user.id && (
            <div className="comment-options__delete">
              <DeleteComment
                comment={comment}
                user={user}
                post={post}
                setAllComments={setAllComments}
                commentId={comment.ID}
                setCommentsNumber={setCommentsNumber}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
