 export default function getPokemonTag(pokemonId:string|number, length = 3) {
    const strId = typeof pokemonId !== 'string'
      ? pokemonId.toString()
      : pokemonId
    return `#${strId.padStart(length, '0')}`
  }
  