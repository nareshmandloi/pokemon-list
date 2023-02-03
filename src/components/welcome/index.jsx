import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'

const Welcome = () => {
    return (
        <div className='welcome-wrapper'>
            <div className=" text-center">
            <h1 className="title">Welcome to the Pokemon World!</h1>
           <Link to='/pokemon-list'> <button className='btn btn-warning mt-4'>Pockemon List</button></Link>
        </div>
        </div>
    );
}

export default Welcome;
