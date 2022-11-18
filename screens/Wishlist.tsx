import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { useFonts } from "expo-font";
import { RootState } from "../redux/store";
import Search from "react-native-vector-icons/FontAwesome";
import WishlistCard from "../components/WishlistCard";
import Header from "../components/Header";
import FooterMenu from "../components/FooterMenu";
import { PokemonType } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { removePokemonFromWishList } from "../redux/features/slices/pokeSlice";

type Props = StackScreenProps<RootStackParamList, "Wishlist">;

const Wishlist: FC<Props> = ({ route, navigation: { navigate } }) => {
  const dispatch = useDispatch();
  const { wishListPokemons } = useSelector(
    (state: RootState) => state.pokemons
  );

  const [searchResult, setSearchResult] = useState<PokemonType[]>(wishListPokemons);
  const [inputText, setInputText] = useState<string>("");

  const handleChangeText = (text: string) => {
    if (text !== "") {
      let results;
      if (/\d/.test(text)) {
        results = wishListPokemons.filter((pokemon) => {
          return pokemon.id.toString().startsWith(text.toLowerCase());
        });
      } else {
        results = wishListPokemons.filter((pokemon) => {
          return pokemon.name.toLowerCase().startsWith(text.toLowerCase());
        });
      }
      setSearchResult(results);
    } else {
      setSearchResult(wishListPokemons);
    }
    setInputText(text);
  };

  useEffect(() => {
    setSearchResult(wishListPokemons);
  }, [wishListPokemons]);

  useFonts({
    FlexoDemi: require("../assets/fonts/Flexo/Flexo-Demi.ttf"),
    FlexoRegular: require("../assets/fonts/Flexo/Flexo-Regular.ttf"),
    FlexoBold: require("../assets/fonts/Flexo/Flexo-Bold.ttf"),
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="#00BCD4" hidden={false} />
      <Header title="Pokedex" hasButton={false} pokeball={true} />
      <View style={styles.content}>
        <Text style={styles.titleText}>
          Search for Pokemon by name or by using the National Pokedex number.
        </Text>
      </View>
      <View style={styles.search}>
        <Search name="search" size={18} color={"#757575"} />
        <TextInput
          keyboardType="visible-password"
          style={styles.input}
          onChangeText={handleChangeText}
          value={inputText}
          placeholder="What Pokemon are you looking for?"
        />
      </View>
      <WishlistCard
        data={searchResult}
        onPress={(pokemon) => {
          navigate("Details", {
            itemId: pokemon.id,
            pokemonDetails: pokemon,
          });
        }}
        removePokemon={(id) => {
          dispatch(removePokemonFromWishList(id));
          setInputText("");
        }}
      />
      <FooterMenu route={route.name} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#FFFFFF",
  },
  content: {
    top: -15,
    paddingHorizontal: 15,
  },
  titleText: {
    marginRight: 10,
    fontFamily: "FlexoDemi",
    fontSize: 16,
    lineHeight: 20,
  },
  search: {
    padding: 5,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 40,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    padding: 5,
    fontSize: 14,
    fontColor: "#35353A",
    fontFamily: "FlexoDemi",
    borderWidth: 0,
  },
});

export default Wishlist;