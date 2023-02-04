import React, { useEffect, useState } from 'react';
import axios from 'axios';
import store from '../../store';
import { pokemonList } from '../../store/reducer/pokemonSlice'
import Card from '../card';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import './styles.css';
import Select from 'react-select'

const List = () => {
    const [pokemonList, setPokemonList] = useState();

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/').then((res) => {
            // store.dispatch(pokemonList(res.data.results));
            setPokemonList(res.data.results)
        }).catch((error) => {
            console.log(error);
        })
    }, []);


    return (
        <div className="container">
            <br /><br />
            <div className="d-flex">
                <div className="col-12 col-md-4">
                    <h2>Pokemon List</h2>
                </div>
                <div className="d-flex flex-wrap justify-content-end col-12 col-md-8">
                    <Select className='px-4' options={options} />
                    <Select options={options} isMulti/>
                </div>
            </div>
            <br />
            <div className="row" >
                {
                    pokemonList ? (
                        pokemonList.map((pokemon, index) => {
                            return <Card key={index + 1} pokemon={pokemon} />;
                        })
                    ) : (
                        <p>Loading...</p>
                    )}
            </div>
        </div>

    );
}

export default List;
