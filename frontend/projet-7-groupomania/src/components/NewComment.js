import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const NewComment = (postId) => {
  return (
    <div className="comment">
      <FontAwesomeIcon className="comment__icone" icon={faComment} size="lg" />
    </div>
  );
};

export default NewComment;
