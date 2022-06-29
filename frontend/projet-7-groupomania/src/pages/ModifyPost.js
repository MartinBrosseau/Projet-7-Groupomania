import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { UserToken } from "../components/UserToken";
import { useNavigate } from "react-router-dom";

const ModifyPost = (postTitle, postImg, postDescription, postId) => {
  const navigate = useNavigate();
  const { token } = useContext(UserToken);
  const imgFiled = useRef(null);
  const [postInfos, setPostInfos] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setPostInfos((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", postInfos.title);
    formData.append("description", postInfos.description);
    formData.append("image", imgFiled.current.files[0]);
    axios
      .post(
        `http://localhost:3000/api/post/modifyPost`,
        formData,

        { headers: { authorization: `Bearer ${token}` }, params: postId }
      )
      .then(function (res) {
        setPostInfos(res.data);
        navigate("/homepage");
      });
  };

  return (
    <div className="modify-post">
      <div className="modify-form">
        <form action="post" className="form">
          <div className="form-group">
            <label htmlFor="title">Titre du post</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              id="title"
              name="title"
              defaultValue={postTitle}
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Insérer une image</label>
            <input
              type="file"
              ref={imgFiled}
              accept="image/*"
              className="form-control"
              onChange={handleChange}
              id="imageUrl"
              name="imageUrl"
              defaultValue={postImg}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Contenu du post</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              id="description"
              name="description"
              defaultValue={postDescription}
            />
          </div>

          <button
            className="btn btn-primary btn-lg"
            type="submit"
            onClick={handleSubmit}
          >
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModifyPost;
