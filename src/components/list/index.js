import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card";
import "./styles.css";
import Select from "react-select";
import Pagination from "react-paginate";

const List = () => {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [pokemonDetailsCopy, setPokemonDetailsCopy] = useState([]);
  const [pokemonType, setPokemonType] = useState();
  const [selectedPokemonName, setSelectedPokemonName] = useState();
  const [selectedType, setSelectedType] = useState();
  const [pokemon, setPokemon] = useState([]);
  const [pokemonCopy, setPokemonCopy] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [isClearable, setIsClearable] = useState(true);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type/")
      .then((res) => {
        setPokemonType(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
   setPokemonDetails(pokemonDetailsCopy);
  }, [isClearable]);

  useEffect(() => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${perPage}`
      )
      .then((res) => {
        setPokemon(res.data.results);
        setPokemonCopy(res.data.results);
        setCurrentPage(Math.ceil(res.data.count / perPage));
        setPokemonDetails([]);
        setPokemonDetailsCopy([]);
        res.data.results.map((pokemon) => {
          axios
            .get(pokemon.url)
            .then((response) => {
              if (response.data) {
                setPokemonDetails((prev) => [...prev, ...[response.data]]);
                setPokemonDetailsCopy((prev) => [...prev, ...[response.data]]);
              }
            })
            .catch((error) => {
              console.log(error);
            });
          return "";
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [offset, perPage]);

  const handlePageClick = (data) => {
    console.log(pokemon)
    const selectedPage = data.selected;
    setOffset((selectedPage + 1) * perPage);
  };

  const isMatch = (arr1, arr2) => {
    return (
      arr1.length === arr2.length &&
      arr1.every((element) => arr2.includes(element))
    );
  };

  useEffect(() => {
    // TODO: filter based on type selected
    const filteredResult = pokemonDetailsCopy.filter((p) => {
      const typesArr = p.types?.map((obj) => {
        const { type } = obj;
        return type.name;
      });
      if (!selectedType?.length) {
        return true;
      }
      return isMatch(typesArr, selectedType);
    });
    setPokemonDetails([...filteredResult]);
  }, [selectedType, pokemonDetailsCopy]);

  const getOptionName = (option) => option.name;
  const onTypeChange = (values) => {
    const type = values.map((obj) => obj.name);
    setSelectedType(type);
  };

  useEffect(() => {
   if(selectedPokemonName) {
    const pokemonByName = pokemonDetailsCopy.filter((ele) => selectedPokemonName.name === ele.name);
    setPokemonDetails(pokemonByName);
   }
  }, [pokemonDetailsCopy, selectedPokemonName]);

  const onNameChange = (data) => {
    setSelectedPokemonName(data);
  }

  const renderedPokemonList = pokemonDetails.map((pokemon, index) => {
    return <Card key={index+1} pokemon={pokemon} />;
  });

  return (
    <div className="container">
      <br />
      <br />
      <div className="d-flex">
        <div className="col-4">
          <h2>Pokemon List</h2>
        </div>
        <div className="col-4">
          <Select
            getOptionLabel={getOptionName}
            getOptionValue={getOptionName}
            className="px-4"
            onChange={onNameChange}
            options={pokemonCopy  }
            placeholder="Select your favorite pokemon"
            isClearable={isClearable}
          />
        </div>
        <div className="col-4">
          <Select
            getOptionLabel={getOptionName}
            getOptionValue={getOptionName}
            options={pokemonType}
            onChange={onTypeChange}
            isMulti
            placeholder="Select pokemon type"
          />
        </div>
      </div>
      <br />
      <div className="row">{renderedPokemonList}</div>
      <Pagination
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={currentPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default List;
