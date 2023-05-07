import React, { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const backgroundType = {
  normal: "bg-[#BA707F]",

  fighting: "bg-[#E95B36]",

  flying: "bg-[#8c8b3f]",

  poison: "bg-[#C48EF9]",

  ground: "bg-[#9C6614]",

  rock: "bg-[#B9B9BA]",

  bug: "bg-[#C3DEA3]",

  ghost: "bg-[#5A61DD]",

  steel: "bg-[#9BB7AD]",

  fire: "bg-[#E75C35]",

  water: "bg-[#1479FB]",

  grass: "bg-[#B1DBBC]",

  electric: "bg-[#ecf27c]",

  psychic: "bg-[#e673f5]",

  ice: "bg-[#C4EBFB]",

  dragon: "bg-[#8DD6E0]",

  dark: "bg-[#4F4F4F]",

  fairy: "bg-[#C5597E]",

  unknown: "bg-[#a8a5a5]",

  shadow: "bg-[#7533d6]",
};

const backgroundByType = {

  normal: "from-[#735259] to-[#BC6B7C]", 

  fighting: "from-[#96402A] to-[#F1613C]",

  flying: "from-[#ccca3d] to-[#9e9d41]",

  poison: "from-[#5B3184] to-[#CE9BFF]",

  ground: "from-[#654008] to-[#D69638]",

  rock: "from-[#7E7E7E] to-[#D3D3D3]",

  bug: "from-[#62DB60] to-[#AAFFA8]",

  ghost: "from-[#323569] to-[#787DDA]",

  steel: "from-[#5E736C] to-[#A8A8A8]", 

  fire: "from-[#E35825] to-[#E8AE1B]",

  water: "from-[#1479FB] to-[#82B2F1]",

  grass: "from-[#7EC6C5] to-[#CAE099]",

  electric: "from-[#fcd547] to-[#ecf27c]",

  psychic: "from-[#e345f7] to-[#e77df5]",

  ice: "from-[#6FBEDF] to-[#BDEBFE]",

  dragon: "from-[#478A93] to-[#A2BEC1]",

  dark: "from-[#030706] to-[#5A5E5D]",

  fairy: "from-[#971B45] to-[#CD7D98]",

  unknown: "from-[#8c8b8b] to-[#bdb9b9]",

  shadow: "from-[#7527e6] to-[#a069f0]",

};

const textByType = {
  normal: "text-[#BA707F]",

  fighting: "text-[#E95B36]",

  flying: "text-[#8c8b3f]",

  poison: "text-[#C48EF9]",

  ground: "text-[#9C6614]",

  rock: "text-[#B9B9BA]",

  bug: "text-[#C3DEA3]",

  ghost: "text-[#5A61DD]",

  steel: "text-[#9BB7AD]",

  fire: "text-[#E75C35]",

  water: "text-[#1479FB]",

  grass: "text-[#B1DBBC]",

  electric: "text-[#ecf27c]",

  psychic: "text-[#e673f5]",

  ice: "text-[#C4EBFB]",

  dragon: "text-[#8DD6E0]",

  dark: "text-[#4F4F4F]",

  fairy: "text-[#C5597E]",

  unknown: "text-[#a8a5a5]",

  shadow: "text-[#7533d6]",
};

const PokemonId = () => {
  const [pokemon, setPokemon] = useState();

  const { id } = useParams();

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getPercentStatBar = (stat_base) => {
    const percentBarProgress = Math.floor((stat_base * 100) / 255);
    return `${percentBarProgress}%`;
  };

  return (
    <section>
      <Header />

      <section className="px-2 py-28">
        <article className="max-w-[800px] mx-auto shadow-xl p-2">
          {/* todo lo de arriba */}
          <section className={`relative bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} h-[100px]`}>
            <div className="w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-24">
              <img
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </div>
          </section>

          {/* informacion del pokemon */}
          <section className="text-center">
            <div className={`${textByType[pokemon?.types[0].type.name]} font-bold py-2 mt-2 `}>
              <h3># {pokemon?.id}</h3>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3">
              <hr />
              <h2 className={`capitalize font-bold ${textByType[pokemon?.types[0].type.name]} text-3xl`}>{pokemon?.name}</h2>
              <hr />
            </div>

            <div className="flex justify-center gap-6 text-center py-3">
              <div>
                <h5>Weight</h5>
                <span>{pokemon?.weight}</span>
              </div>
              <div>
                <h5>Height</h5>
                <span>{pokemon?.height}</span>
              </div>
            </div>

            <section className="grid sm:grid-cols-2 gap-4 px-3">
              {/* tipos  */}
              <section className="capitalize text-center font-semibold">
                <h3>Types</h3>
                <section className="grid grid-cols-2 gap-4 mt-4 text-white">
                  {/* aqui hay un bug, color de tipo se repite */}
                  {pokemon?.types.map((type) => (
                    <article
                      className={`truncate p-2 px-8 border-[1px] border-gray-300 ${
                        backgroundType[type.type.name]
                      }`}
                      key={type.type.url}
                    >
                      {type.type.name}
                    </article>
                  ))}
                </section>
              </section>
              {/* habilidades */}
              <section className="text-center font-semibold capitalize">
                <h3>Abilities</h3>
                <section className="grid grid-cols-2 gap-4 mt-4 font-normal">
                  {/* aqui hay un bug, color de tipo se repite */}
                  {pokemon?.abilities.map((ability) => (
                    <article
                      className="truncate p-2 px-8 border-[1px] border-gray-300"
                      key={ability.ability.url}
                    >
                      {ability.ability.name}
                    </article>
                  ))}
                </section>
              </section>
            </section>
          </section>

          {/* seccion de stats */}
          <section className="grid px-3">
            <h3 className="font-bold py-3 mt-3 text-2xl">Stats</h3>

            <section>
              {pokemon?.stats.map((stat) => (
                <article key={stat.stat.url}>
                  <section className="flex justify-between">
                    <h5 className="capitalize">{stat.stat.name}</h5>
                    <span>{stat.base_stat}/255</span>
                  </section>
                  <div className="bg-gray-100 h-6 rounded-sm">
                    <div
                      style={{ width: getPercentStatBar(stat.base_stat) }}
                      className="h-full w-1/2 bg-gradient-to-r from-yellow-300 to-yellow-500"
                    ></div>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </article>
      </section>
    </section>
  );
};

export default PokemonId;
