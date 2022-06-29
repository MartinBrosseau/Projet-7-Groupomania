import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserToken } from "./UserToken";

const PostCreator = ({ postUserId }) => {
  const { token } = useContext(UserToken);
  const [postCreator, setPostCreator] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/post/postCreator", {
        headers: { authorization: `Bearer ${token}` },
        params: { postUserId },
      })
      .then((res) => setPostCreator(res.data[0]));
  }, [token, postUserId]);

  return (
    <div>
      <h4>
        {postCreator.username} <small>a posté</small>
      </h4>
    </div>
  );
};

export default PostCreator;
