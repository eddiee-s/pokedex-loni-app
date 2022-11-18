import { EvolutionDataType, EvolutionResultType, PokemonType } from "../types";

export default function handleEvoChain (result: EvolutionDataType, pokemons:PokemonType[]) {
    let evoChain = [] as any;
    let evoData = result.chain as any;
    do {
      let evoDetails = evoData?.evolution_details[0];
      evoChain.push({
        species_name: evoData?.species.name,
        min_level: !evoDetails ? 1 : evoDetails.min_level,
        trigger_name: !evoDetails ? null : evoDetails.trigger.name,
        item: !evoDetails ? null : evoDetails.item,
      });

      evoData = evoData?.evolves_to[0];
    } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
    evoChain = evoChain
      .filter((pokemon:EvolutionResultType) =>
      pokemons.some((f) => f.name === pokemon.species_name)
      )
      .map((item:EvolutionResultType) => ({
        ...item,
        id: pokemons.find((f) => f.name === item.species_name)?.id,
      }));
    return evoChain;
  };