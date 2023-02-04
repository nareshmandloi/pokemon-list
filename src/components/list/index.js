import React, { useEffect, useState } from "react";
import axios from "axios";
// import store from "../../store";
// import { pokemonList } from "../../store/reducer/pokemonSlice";
// import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Card from "../card";
import "./styles.css";
import Select from "react-select";
import Pagination from "react-paginate";

const List = () => {
  //   const [pokemonList, setPokemonList] = useState();
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [pokemonDetailsCopy, setPokemonDetailsCopy] = useState([]);
  const [pokemonType, setPokemonType] = useState();
  const [selectedType, setSelectedType] = useState();
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type/")
      .then((res) => {
        setPokemonType(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon??offset=${offset}&limit=${perPage}`
      )
      .then((res) => {
        // store.dispatch(pokemonList(res.data.results));
        // setPokemonList(res.data.results);
        res.data.results.map((pokemon) => {
          axios
            .get(pokemon.url)
            .then((response) => {
              if (response.data) {
                setPokemonDetails((prev) => [...prev, ...[response.data]]);
                setPokemonDetailsCopy((prev) => [...prev, ...[response.data]]);
              }
            })
            .catch(console.log);
          return "";
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [offset, perPage]);

  const handlePageClick = (data) => {
    data.selected += 1;
    const selectedPage = data.selected;
    const newOffset = selectedPage * perPage;
    setCurrentPage(selectedPage);
    setOffset(newOffset);
  };

  const isMatch = (arr1, arr2) => {
    return (
      arr1.length === arr2.length &&
      arr1.every((element) => arr2.includes(element))
    );
  };

  useEffect(() => {
    // TODO: filter based on type selected
    const filterdResult = pokemonDetailsCopy.filter((p) => {
      //pokemonDetailsCopy is the copy of pokenmon list with all detais, keeping it for fiter only
      const typesArr = p.types?.map((obj) => {
        const { type } = obj;
        return type.name;
      });
      if (!selectedType?.length) {
        return true;
      }
      return isMatch(typesArr, selectedType);
    });
    setPokemonDetails([...filterdResult]); // list of pokenmon with details
  }, [selectedType, pokemonDetailsCopy]);

  const getOptionName = (option) => option.name;
  const onTypeChange = (values) => {
    const type = values.map((obj) => obj.name);
    setSelectedType(type);
  };

  const renderedPokemonList = pokemonDetails.map((pokemon, index) => {
    return <Card key={index} pokemon={pokemon} />;
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
            className="px-4"
            options={options}
            placeholder="Select your favorite pokemon"
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
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={1000 / perPage}
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
