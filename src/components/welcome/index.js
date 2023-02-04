import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Welcome = () => {
  return (
    <div className="welcome-wrapper d-flex align-items-center">
      <div className="text-center w-100">
        <h1 className="mb-4">Welcome to the Pokemon World!</h1>
        <Link to="/pokemon-list">
          <button className="btn btn-warning mt-4">Pockemon List</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
