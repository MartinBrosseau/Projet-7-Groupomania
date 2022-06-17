import React, { useEffect, useState, useContext } from "react";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { UserToken } from "./UserToken";
import axios from "axios";

const DeletePost = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faTrashCan} className="icone-option" size="lg" />
    </div>
  );
};

export default DeletePost;
