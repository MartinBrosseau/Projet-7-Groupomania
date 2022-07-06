import axios from "axios";
import React, { useState, useContext } from "react";
import { UserToken } from "./UserToken";

const AddComment = ({ post, user }) => {
  const { token } = useContext(UserToken);
  const [commentText, setCommentText] = useState({
    content: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setCommentText((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = commentText;
    axios.post(
      "http://localhost:3000/api/comment/createComment",
      { ...data },
      {
        headers: { authorization: `Bearer ${token}` },
        params: { postId: post.Id },
      }
    );
  };

  return (
    <div>
      <div className="new-comment">
        {user.id && (
          <form action="post" className="form">
            <div className="form-group">
              <label htmlFor="content">
                <input
                  type="text"
                  id="content"
                  name="content"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Laisse un commentaire !"
                />
              </label>

              <br />
              <button
                className="btn btn-primary "
                type="submit"
                onClick={handleSubmit}
              >
                Envoyer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddComment;
