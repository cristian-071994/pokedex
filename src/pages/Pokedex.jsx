import React, { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonCard from "../components/pokedex/PokemonCard";

const Pokedex = () => {
  /* array de pokemones antes de filtrar */
  const [pokemons, setPokemons] = useState([]);

  /* estring para filtrar los pokemones por nombre */
  const [pokemonName, setPokemonName] = useState("");

  /* arreglo de tipos de pokemones posibles */
  const [types, setTypes] = useState([]);

  /* string de tipo de pokemon actual, cambia de acuerdo al select, almacen al tipo actual del select*/
  const [currentType, setCurrentType] = useState("");

  /* pagina actual */
  const [currentPage, setCurrentPage] = useState(1);

  /* estado global donde se almacena el nombre del usuario */
  const nameTrainer = useSelector((store) => store.nameTrainer);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
    e.target.pokemonName.value = "";
  };

  /* const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  ); */

  const paginationLogic = () => {
    /* Cantidad de pokemones por pagina */
    const POKEMONS_PER_PAGE = 12;

    /* pokemones que se van a mostrar en la pagina actual */
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE;
    const pokemonInPage = pokemons.slice(sliceStart, sliceEnd);

    /* ultima pagina */
    const lastPage = Math.ceil(pokemons.length / POKEMONS_PER_PAGE) || 1;

    /* Bloque de paginacion actual */
    const PAGES_PER_BLOCK = 5;
    const currentBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);

    /* paginas que se van a mostrar en el bloque actual */
    const pagesInBlock = [];
    const minPage = (currentBlock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = currentBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }
    return { pokemonInPage, lastPage, pagesInBlock };
  };

  const { lastPage, pagesInBlock, pokemonInPage } = paginationLogic();

  const handleClickPreviousPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage);
    }
  };

  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";

      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";

    axios
      .get(URL)
      .then((res) => {
        const newTypes = res.data.results.map((type) => type.name);
        setTypes(newTypes);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentType) {
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;
      axios
        .get(URL)
        .then((res) => {
          const pokemonByType = res.data.pokemon.map(
            (pokemon) => pokemon.pokemon
          );
          setPokemons(pokemonByType);
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    if (pokemonName) {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=1281";
      axios
        .get(url)
        .then((res) => {
          const pokemonByName = res.data.results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
          );
          setPokemons(pokemonByName);
        })
        .catch((err) => console.log(err));
    }
  }, [pokemonName]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemonName, currentType]);

  return (
    <section className="min-h-screen">
      <Header />
      {/* Seccion de filtros y saludo */}
      <article className="py-6 px-3 sm:py-3 sm:px-20 capitalize">
        <section>
          <h3 className="text-lg">
            <span className="text-[#FE1936] font-bold">
              Welcome {nameTrainer},
            </span>{" "}
            here you can find your favorite pokemón
          </h3>
        </section>

        <form onSubmit={handleSubmit} className="py-4">
          <div className="py-3 flex gap-1 text-lg mx-auto">
            <input
              id="pokemonName"
              className="outline-none shadow-sm"
              type="text"
              placeholder="Search your pokemon"
            />
            <button className="bg-[#D93F3F] text-white px-2 rounded-md">
              Search
            </button>
          </div>
          <select onChange={(e) => setCurrentType(e.target.value)}>
            <option value="">All pokemón</option>
            {types.map((type) => (
              <option className="capitalize" value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </form>

        {/* seccion lista de pokemones */}
        <section className="px-2 grid gap-6 auto-rows-auto grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1024px] mx-auto">
          {pokemonInPage.map((pokemon) => (
            <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
          ))}
        </section>
        <section className="sm:flex sm:justify-center">
          {/* paginacion */}
        <ul className="flex gap-3 justify-center py-4 px-2 flex-wrap">
          {/* primer pagina */}
          <li
            onClick={() => setCurrentPage(1)}
            className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"
          >
            {"<<"}
          </li>
          {/* pagina anterior */}
          <li
            onClick={handleClickPreviousPage}
            className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"
          >
            {"<"}
          </li>
        </ul>
        <ul className="flex gap-3 justify-center py-4 px-2 flex-wrap">
        
          {/* lista de paginas */}
          {pagesInBlock.map((numberPage) => (
            <li
              onClick={() => setCurrentPage(numberPage)} /* bug */
              className={`p-3  font-bold text-white rounded-md cursor-pointer ${
                numberPage === currentPage ? "bg-red-400" : "bg-red-600"
              }`}
              key={numberPage}
            >
              {numberPage}
            </li>
          ))}
          
        </ul>
        <ul className="flex gap-3 justify-center py-4 px-2 flex-wrap">
          {/* pagina siguiente */}
          <li
            onClick={handleClickNextPage}
            className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"
          >
            {">"}
          </li>
          {/* ultima pagina */}
          <li
            onClick={() => setCurrentPage(lastPage)}
            className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer"
          >
            {">>"}
          </li>
        </ul>
        </section>
      </article>
    </section>
  );
};

export default Pokedex;
