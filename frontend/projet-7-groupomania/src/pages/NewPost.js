import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const imgFiled = useRef(null);
  const [postInfos, setPostInfos] = useState({
    title: "",
    description: "",
  });

  const backToHomepage = () => {
    let path = "/homepage";
    navigate(path);
  };

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
        `${process.env.REACT_APP_API_URL}/post/createPost`,
        formData,

        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then(function (res) {
        navigate("/homepage");
      });
  };

  return (
    <div className="new-post">
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
          <label htmlFor="imageUrl">Insérer une image</label>
          <input
            type="file"
            ref={imgFiled}
            accept="image/*"
            className="form-control"
            onChange={handleChange}
            id="imageUrl"
            name="imageUrl"
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
      <button className="btn btn-primary" onClick={backToHomepage}>
        Retour
      </button>
    </div>
  );
};

export default NewPost;
