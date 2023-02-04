import React, { Fragment, useState } from 'react';
import './styles.css'
import ReactModal from 'react-modal';


const Modal = (props) => {
    const [isOpen, setIsOpen] = useState(props.isOpen);
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Fragment>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
            >
                <h2>{capitalizeFirstLetter(props.pokemon.name)} Details</h2>
                <hr />
                <p><b>Base Experience : </b>{props.pokemon.base_experience}</p>
                <hr />
                <p><b>Height : </b>{props.pokemon.height}</p>
                <hr />
                <p><b>Order : </b>{props.pokemon.order}</p>
                <hr />
                <p><b>Weight : </b>{props.pokemon.weight}</p>
                <hr />
                <p><b>Weight : </b>{props.pokemon.weight}</p>
                <div className='d-flex justify-content-center'>
                <button className='btn btn-primary' onClick={() => setIsOpen(false)}>Close Modal</button>
                </div>

            </ReactModal>
        </Fragment>
    );
};

export default Modal;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};