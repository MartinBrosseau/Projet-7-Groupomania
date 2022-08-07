import axios from "axios";
import React, { useState } from "react";

const AddComment = ({
  post,
  user,
  setAllComments,
  allComments,
  setCommentsNumber,
}) => {
  const token = sessionStorage.getItem("token");
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
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/comment/createComment`,
        { ...data },
        {
          headers: { authorization: `Bearer ${token}` },
          params: { postId: post.Id },
        }
      )
      .then((res) => {
        const newCommentsList = [...allComments];
        newCommentsList.push(data);
        setAllComments(newCommentsList);
        setCommentsNumber(++post.comments_number);
        event.target.reset();
      });
  };

  return (
    <div>
      <div className="new-comment">
        {user.id && (
          <form action="post" className="form" onSubmit={handleSubmit}>
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
              <button className="btn btn-primary" type="submit">
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
