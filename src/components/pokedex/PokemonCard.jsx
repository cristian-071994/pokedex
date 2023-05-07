import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const bordersByType = {

    normal: "border-[#BA707F]",

    fighting: "border-[#E95B36]",

    flying: "border-[#8c8b3f]",

    poison: "border-[#C48EF9]",

    ground: "border-[#9C6614]",

    rock: "border-[#B9B9BA]",

    bug: "border-[#C3DEA3]",

    ghost: "border-[#5A61DD]",

    steel: "border-[#9BB7AD]", 

    fire: "border-[#E75C35]",

    water: "border-[#1479FB]",

    grass: "border-[#B1DBBC]",

    electric: "border-[#ecf27c]",

    psychic: "border-[#e673f5]",

    ice: "border-[#C4EBFB]",

    dragon: "border-[#8DD6E0]",

    dark: "border-[#4F4F4F]",

    fairy: "border-[#C5597E]",

    unknown: "border-[#a8a5a5]",

    shadow: "border-[#7533d6]",

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



const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState();

  const types = pokemon?.types
    .slice(0, 2)
    .map((type) => type.type.name)
    .join(" / ");

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 rounded-md ${bordersByType[pokemon?.types[0].type.name]}`}>
      {/* seccion superior */}
      <section className={`relative bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} h-[150px]`}>
        <div className="absolute -bottom-16 w-[200px] left-1/2 -translate-x-1/2">
          <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </div>
      </section>

      {/* seccion inferior */}
      <section className="grid px-2">
        <h3 className={`mt-14 ${textByType[pokemon?.types[0].type.name]} font-bold text-3xl`}>{pokemon?.name}</h3>
        <h4 className="font-medium text-gray-600 text-xl">{types}</h4>
        <span className="text-gray-400 text-sm">Type</span>
        <hr className={` ${bordersByType[pokemon?.types[0].type.name]}`}/>

        <section className="grid grid-cols-3 gap-2 p-2 text-gray-300 uppercase text-sm justify-center items-center">
          {pokemon?.stats.map((stat) => (
            <div key={stat.stat.url}>
              <h5>{stat.stat.name}</h5>
              <span className={`${textByType[pokemon?.types[0].type.name]} font-semibold`}>{stat.base_stat}</span>
            </div>
          ))}
        </section>
      </section>
    </Link>
  );
};

export default PokemonCard;
