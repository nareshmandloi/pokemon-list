import React, { Fragment, useState } from "react";
import "./styles.css";
import ReactModal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";

const Modal = (props) => {
  debugger;
  const [isOpen, setIsOpen] = useState(props.isOpen);

  const handleEvent = () => {
    props.handleClick();
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Fragment>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <div className="card">
          <div className="card-header">
            <h2 className="text-capitalize">
              {capitalizeFirstLetter(props.pokemon.name)} Details
            </h2>
          </div>
          <div className="card-body">
            <p>
              <b>Base Experience:</b> {props.pokemon.base_experience}
            </p>
            <p>
              <b>Height:</b> {props.pokemon.height}
            </p>
            <p>
              <b>Order:</b> {props.pokemon.order}
            </p>
            <p>
              <b>Weight:</b> {props.pokemon.weight}
            </p>
          </div>
          <div className="card-footer d-flex justify-content-center">
            <button className="btn btn-primary" onClick={handleEvent}>
              Close Modal
            </button>
          </div>
        </div>
      </ReactModal>
    </Fragment>
  );
};

export default Modal;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
