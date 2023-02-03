import React from 'react';
import './styles.css'

const Card = (props) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="card mb-4">
          <img src="https://via.placeholder.com/300x300" className="card-img-top" alt="Ivysaur" />
          <div className="card-body">
            <h5 className="card-title text-center">Ivysaur</h5>
            <p className="card-text text-center">#002</p>
          </div>
        </div>
      </div>
    );
}

export default Card;
