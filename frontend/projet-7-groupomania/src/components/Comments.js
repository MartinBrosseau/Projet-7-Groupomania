import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { UserToken } from "./UserToken";

const Comments = ({ post, user }) => {
  const { token } = useContext(UserToken);
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/comment/getComments", {
        headers: { authorization: `Bearer ${token}` },
        params: { postId: post.Id },
      })
      .then((res) => setAllComments(res.data));
  }, [token, post.Id]);
  return (
    <div>
      <div className="comments-container">
        {allComments.map((comment, index) => (
          <CommentCard
            comment={comment}
            key={comment.ID}
            post={post}
            user={user}
            setAllComments={setAllComments}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
