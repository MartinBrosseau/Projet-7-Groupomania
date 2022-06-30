import React, { useRef, useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserToken } from "../components/UserToken";
import { useLocation, useNavigate } from "react-router-dom";

const ModifyPost = () => {
  const navigate = useNavigate();
  const { token } = useContext(UserToken);
  const location = useLocation();

  const [defaultValues, setDefaultValues] = useState({
    title: "",
    img: "",
    description: "",
    postId: "",
  });

  useEffect(() => {
    if (location.state) {
      let _state = location.state;
      setDefaultValues(_state);
    }
  }, [location.state]);

  const imgFiled = useRef();
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
    formData.append("title", postInfos.title || defaultValues.title);
    formData.append(
      "description",
      postInfos.description || defaultValues.description
    );
    formData.append("image", imgFiled.current.files[0] || defaultValues.img);
    axios
      .put(
        `http://localhost:3000/api/post/modifyPost`,
        formData,

        {
          headers: { authorization: `Bearer ${token}` },
          params: { currentPostId: defaultValues.postId },
        }
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
              defaultValue={defaultValues.title}
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
              defaultValue={defaultValues.img}
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
              defaultValue={defaultValues.description}
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
