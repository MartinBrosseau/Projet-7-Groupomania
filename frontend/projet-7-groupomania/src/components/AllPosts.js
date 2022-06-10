import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/post/getAllPosts")
      .then((res) => setAllPosts(res.data));
  }, []);
  return (
    <div className="posts-container">
      <h3>Découvrez les derniers posts !</h3>
      <div className="all-posts">
        {allPosts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
