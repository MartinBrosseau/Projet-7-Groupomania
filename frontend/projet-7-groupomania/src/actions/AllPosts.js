import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

const AllPosts = () => {
  const token = sessionStorage.getItem("token");
  const [allPosts, setAllPosts] = useState([]);
  const [userProfil, setUserProfil] = useState([]);
  const [count, setCount] = useState(3);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setAllPosts(allPosts);
      setCount(count + 3);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/getAllPosts`, {
        headers: { authorization: `Bearer ${token}` },
        params: { id: allPosts.id },
      })
      .then((res) => {
        const postsArray = res.data.slice(0, count);
        setAllPosts(postsArray);
      });
  }, [token, allPosts.id, allPosts.user_id, count]);

  useEffect(() => {
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/userProfil`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setUserProfil(res.data));
  }, [token]);

  return (
    <div className="posts-container">
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
