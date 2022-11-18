import { FC, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import getPokemonTag from "../utils/pokemon-tag";
import Heart from "react-native-vector-icons/FontAwesome";
import Back from "react-native-vector-icons/AntDesign";
import { useFonts } from "expo-font";
import { POKEMON_TYPE_COLORS } from "../constants";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { PokemonColorType, TypesType } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";
import { RootState } from "../redux/store";
import { usePokemonsDetailsQuery } from "../redux/features/api/pokemons-api-slice";
import {
  addPokemonToWishList,
  removePokemonFromWishList,
} from "../redux/features/slices/pokeSlice";

import pokeball from "../assets/pokeball.png";
import Spinner from "../components/Spinner";
import FooterMenu from "../components/FooterMenu";
import DetailsTabs from "../components/DetailsTabs";

type Props = StackScreenProps<RootStackParamList, "Details">;

const Details: FC<Props> = ({ route, navigation: { goBack } }) => {
  const [isAdded, setIsAdded] = useState<Boolean>(false);

  const dispatch = useDispatch();
  const { wishListPokemons } = useSelector(
    (state: RootState) => state.pokemons
  );

  const { pokemonDetails } = route.params;

  const {
    id,
    types,
    name,
    height,
    weight,
    base_experience: experience,
    abilities,
    stats,
  } = pokemonDetails;

  const pokeColor = types[0].type.name as PokemonColorType;

  useEffect(() => {
    const favPokemon = wishListPokemons.some((poke) => {
      if (poke.id === id) {
        return true;
      }
      return false;
    });
    setIsAdded(favPokemon);
  }, []);

  const {
    data = [],
    isLoading,
    isSuccess,
  } = usePokemonsDetailsQuery(id);

  const { genera } = data;

  const [loaded] = useFonts({
    FlexoDemi: require("../assets/fonts/Flexo/Flexo-Demi.ttf"),
    FlexoRegular: require("../assets/fonts/Flexo/Flexo-Regular.ttf"),
    FlexoBlack: require("../assets/fonts/Flexo/Flexo-Black.ttf"),
  });

  useEffect(() => {
    if (isSuccess && isAdded) {
      dispatch(addPokemonToWishList(pokemonDetails));
    } else if (isSuccess && !isAdded) {
      dispatch(removePokemonFromWishList(id));
    }
  }, [isAdded]);

  return (
    <>
      {isSuccess && (
        <View
          style={[
            styles.container,
            {
              backgroundColor:
                POKEMON_TYPE_COLORS[pokeColor as keyof PokemonColorType],
            },
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => goBack()}>
              <Back name={"arrowleft"} size={26} color={"#fff"} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsAdded(!isAdded);
              }}
            >
              <Heart
                name={isAdded ? "heart" : "heart-o"}
                size={22}
                color={"#fff"}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.info}>
              <Text style={styles.textHeader}>{name}</Text>
              <Text style={[styles.textHeader, { fontSize: 18 }]}>
                {getPokemonTag(id)}
              </Text>
            </View>
            <View style={styles.info}>
              <View style={{ flexDirection: "row" }}>
                {types.map((item: TypesType, index: number) => {
                  return (
                    <View key={index} style={styles.infoTypesContainer}>
                      <Text
                        style={[
                          styles.infoTypes,
                          loaded && { fontFamily: "FlexoDemi" },
                        ]}
                      >
                        {item.type.name}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <Text style={styles.text}>{genera[7].genus}</Text>
            </View>
          </View>
          <View style={styles.imageDetails}>
            <View style={styles.cardImg}>
              <ImageBackground
                source={pokeball}
                resizeMode="center"
                style={styles.imageBg}
              >
                <Image
                  style={styles.cardImg}
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                  }}
                />
              </ImageBackground>
            </View>
          </View>
          <View style={styles.details}>
            <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 30 }}>
              <DetailsTabs
                data={data}
                height={height}
                weight={weight}
                experience={experience}
                abilities={abilities}
                stats={stats}
              />
            </View>
          </View>
        </View>
      )}
      {isLoading && <Spinner />}
      <FooterMenu />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    elevation: 20,
  },
  header: {
    flexDirection: "row",
    padding: 20,
    marginTop: 30,
    justifyContent: "space-between",
  },
  info: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textHeader: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "FlexoBold",
    textTransform: "capitalize",
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "FlexoDemi",
    textTransform: "capitalize",
  },
  infoTypesContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    marginBottom: 5,
    alignSelf: "baseline",
    paddingVertical: 3,
    paddingHorizontal: 13,
    borderRadius: 20,
    marginRight: 6,
  },
  infoTypes: {
    fontSize: 12,
    color: "#FFFF",
    // fontFamily: "FlexoDemi",
    textTransform: "capitalize",
  },
  imageDetails: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    // zIndex: 1000,
    // overflow: 'hidden',
  },
  cardImg: {
    height: 200,
    width: 200,
  },
  imageBg: {
    flex: 1,
    justifyContent: "center",
  },
  details: {
    flex: 1,
    top: -30,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // overflow: 'hidden',
    elevation: 30,
    zIndex: -99,
  },
});
export default Details;