import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const NewPost = () => {
  const [postInfos, setPostInfos] = useState({
    title: "",
    image: "",
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

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = postInfos;
    axios
      .post(`http://localhost:3000/api/post/createPost`, { ...data })
      .then(function (res) {
        if (res.status === 201) {
          navigate("/homepage");
        }
      });
  };

  return (
    <div>
      <form action="post" className="form">
        <div className="form-group">
          <label htmlFor="title">Titre du post</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            id="title"
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Insérer une image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleChange}
            id="image"
            name="image"
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
          />
        </div>

        <button
          className="btn btn-primary btn-lg"
          type="submit"
          onClick={handleSubmit}
        >
          Publier
        </button>
      </form>
    </div>
  );
};

export default NewPost;
