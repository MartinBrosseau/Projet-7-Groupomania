import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-title">{post.title}</div>
      <img src={post.image} alt="post-image" />
      <div className="post-description">{post.descritpion}</div>
    </div>
  );
};

export default PostCard;
