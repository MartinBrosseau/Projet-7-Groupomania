import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import { useContext } from "react";
import { UserToken } from "./UserToken";

const AllPosts = () => {
  const { token } = useContext(UserToken);
  const [allPosts, setAllPosts] = useState([]);
  const [userProfil, setUserProfil] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/post/getAllPosts", {
        headers: { authorization: `Bearer ${token}` },
        params: { id: allPosts.id },
      })
      .then((res) => setAllPosts(res.data));
  }, [token, allPosts.id, allPosts.user_id]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/userProfil", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setUserProfil(res.data));
  }, [token]);

  return (
    <div className="posts-container">
      <h3>Découvrez les derniers posts !</h3>
      <div className="all-posts">
        {allPosts.map((post, index) => (
          <PostCard
            post={post}
            key={post.Id}
            user={userProfil}
            setAllPosts={setAllPosts}
          />
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
