import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../store/reducer/pokemonSlice';
import Modal from '../modal'
import './styles.css'

const Card = (props) => {

  const [pokemonDetails, setPokemonDetails] = useState()
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.pokemon.isOpen)

  const toggleModal = () => {
    setShowModal(!showModal);
    dispatch(openModal(!isOpen));
  };

  useEffect(() => {
    if (props.pokemon.url) {
      axios.get(props.pokemon.url).then((res) => {
        setPokemonDetails(res.data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }, []);


  return (
    <Fragment>
      <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="card mb-4" onClick={toggleModal}>
          <img src={pokemonDetails ? pokemonDetails.sprites.front_default : 'https://via.placeholder.com/300x300'} className="card-img-top" alt="Ivysaur" />
          <div className="card-body">
            <h5 className="card-title text-center">{pokemonDetails ? pokemonDetails.name : 'Loding...'}</h5>
            <p className="card-text text-center">{pokemonDetails ? pokemonDetails.weight : 'Loding...'}</p>
          </div>
        </div>
      </div>
      {showModal && <Modal isOpen={isOpen} pokemon={pokemonDetails} />}

    </Fragment>
  );
}

export default Card;
