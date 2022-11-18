import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { usePokemonsQuery } from "../redux/features/api/pokemons-api-slice";
import { setAllPokemons } from "../redux/features/slices/pokeSlice";
import { RootState, store } from "../redux/store";
import { RootStackParamList } from "../navigation";
import FilterButton from "../components/Filter/FilterButton";
import Spinner from "../components/Spinner";
import FooterMenu from "../components/FooterMenu";
import Header from "../components/Header";
import PokedexCard from "../components/PokedexCard";

type Props = StackScreenProps<RootStackParamList>;

const Home:FC<Props> = ({ route, navigation:{navigate}}) => {

  const { data = [], isLoading, isSuccess } = usePokemonsQuery(20);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setAllPokemons(data));
    }
  }, [data]);

  const { allPokemons } = useSelector((state: RootState) => state.pokemons);

  //TODO: REMOVE LATER
  //isSuccess && console.log(store.getState());


  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="#00BCD4" hidden={false} />
      <Header title="Pokedex" />
      {isSuccess && <PokedexCard data={allPokemons} onPress={(pokemon) => {
                  navigate("Details", {
                    itemId: pokemon.id,
                    pokemonDetails: pokemon,
                  });
                }}/>}
      {isLoading && <Spinner size="large" />}
      <FilterButton />
      <FooterMenu route={route.name} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: "#FFFFFF",
  },
});

export default Home;