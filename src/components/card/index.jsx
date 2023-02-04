import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/reducer/pokemonSlice";
import Modal from "../modal";
import "./styles.css";

const Card = (props) => {
  const [pokemonDetails, setPokemonDetails] = useState(props.pokemon);
  const [showModal, setShowModal] = useState(false);

  const renderTypes =
    props.pokemon.types?.map((obj) => {
      const { type } = obj;
      return type.name;
    }) + "";

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.pokemon.isOpen);

  const toggleModal = () => {
    setShowModal(!showModal);
    dispatch(openModal(!isOpen));
  };

  useEffect(() => {
    if (props.pokemon.url) {
      axios
        .get(props.pokemon.url)
        .then((res) => {
          setPokemonDetails(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.pokemon.url]);

  return (
    <Fragment>
      <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="card mb-4" onClick={toggleModal}>
          <img
            src={props.pokemon.sprites?.front_default}
            className="card-img-top"
            alt={props.pokemon.name}
          />
          <div className="card-body">
            <h5 className="card-title text-center">{props.pokemon.name}</h5>
            <p className="card-text text-center">{renderTypes}</p>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          isOpen={isOpen}
          pokemon={pokemonDetails}
          handleClick={toggleModal}
        />
      )}
    </Fragment>
  );
};

export default Card;
