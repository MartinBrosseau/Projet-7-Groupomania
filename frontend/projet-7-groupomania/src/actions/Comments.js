import axios from "axios";
import React, { useEffect, useState } from "react";
import AddComment from "./AddComment";
import CommentCard from "../components/CommentCard";

const Comments = ({ post, user, setCommentsNumber }) => {
  const token = sessionStorage.getItem("token");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/comment/getComments`, {
        headers: { authorization: `Bearer ${token}` },
        params: { postId: post.Id },
      })

      .then((res) => setAllComments(res.data));
  }, [token, post.Id]);
  return (
    <div>
      <div className="comments-container">
        <AddComment
          post={post}
          user={user}
          setCommentsNumber={setCommentsNumber}
          setAllComments={setAllComments}
          allComments={allComments}
        />
        <div className="comments-map">
          {allComments.map((comment, index) => (
            <CommentCard
              comment={comment}
              key={index}
              post={post}
              user={user}
              setAllComments={setAllComments}
              setCommentsNumber={setCommentsNumber}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
