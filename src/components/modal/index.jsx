import React, { Fragment, useState } from 'react';

const Modal = (props) => {
    const [isOpen, setIsOpen] = useState(props.is);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Fragment>
            <button onClick={toggleModal}>Open Modal</button>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Modal Title</h2>
                        <p>Modal body text goes here.</p>
                        <button onClick={toggleModal}>Close Modal</button>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Modal;