import { FC } from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import Heart from "react-native-vector-icons/FontAwesome";
import { POKEMON_TYPE_COLORS, POKEMON_TYPE_FONT_COLORS } from "../constants";
import { CardProps, PokemonColorType } from "../types";
import getPokemonTag from "../utils/pokemon-tag";
import pokeball from "../assets/pokeball.png";

const WishlistCard: FC<CardProps> = ({
  data,
  onPress = (a) => a,
  removePokemon = (a) => a,
}) => {
  const [loaded] = useFonts({
    FlexoDemi: require("../assets/fonts/Flexo/Flexo-Demi.ttf"),
    FlexoRegular: require("../assets/fonts/Flexo/Flexo-Regular.ttf"),
    FlexoBold: require("../assets/fonts/Flexo/Flexo-Bold.ttf"),
  });
  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 5 }}>
      <ScrollView style={{}}>
        <View style={styles.container}>
          {data.map((pokemon) => {
            const pokeColor = pokemon.types[0].type.name;
            return (
              <TouchableOpacity
                key={pokemon.id}
                onPress={() => onPress(pokemon)}
                style={[
                  styles.card,
                  styles.elevation,
                  {
                    backgroundColor:
                      POKEMON_TYPE_COLORS[pokeColor as keyof PokemonColorType],
                  },
                ]}
              >
                <View style={styles.addHeart}>
                  <TouchableOpacity
                    onPress={() => {
                      removePokemon(pokemon.id);
                      // dispatch(removePokemonFromWishList(pokemon.id));
                    }}
                  >
                    <Heart name="heart" size={22} color={"#fff"} />
                  </TouchableOpacity>
                </View>
                <View style={styles.cardContainer}>
                  <View>
                    <Text
                      style={{
                        fontFamily: "FlexoBold",
                        color:
                          POKEMON_TYPE_FONT_COLORS[
                            pokeColor as keyof PokemonColorType
                          ],
                      }}
                    >
                      {" "}
                      {getPokemonTag(pokemon.id)}{" "}
                    </Text>
                    <Text
                      style={[
                        styles.cardTextHeading,
                        loaded && { fontFamily: "FlexoBold" },
                      ]}
                    >
                      {pokemon.name}
                    </Text>
                    <View style={styles.typeContainer}>
                      {pokemon.types.map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={styles.cardTextTypesContainer}
                          >
                            <Text
                              style={[
                                styles.cardTextTypes,
                                loaded && { fontFamily: "FlexoDemi" },
                              ]}
                            >
                              {item.type.name}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  <View style={styles.cardImage}>
                    <ImageBackground
                      source={pokeball}
                      resizeMode="center"
                      style={styles.imageBg}
                    >
                      <Image
                        style={styles.cardImg}
                        source={{
                          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
                        }}
                      />
                    </ImageBackground>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 4,
    marginBottom: 60,
  },
  addHeart: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 100,
  },
  card: {
    width: "100%",
    height: 140,
    marginVertical: 4,
    borderRadius: 20,
    overflow: "hidden",
  },
  cardContainer: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "center",
    paddingLeft: 15,
    paddingTop: 5,
  },
  cardTextHeading: {
    fontSize: 20,
    color: "#FFFF",
    textTransform: "capitalize",
    marginVertical: 10,
  },
  typeContainer: {
    flexDirection: "row",
  },
  cardTextTypesContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    marginBottom: 5,
    marginRight: 8,
    alignSelf: "baseline",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  cardTextTypes: {
    fontSize: 12,
    color: "#FFFF",
    // fontFamily: "FlexoDemi",
    textTransform: "capitalize",
  },
  cardImage: {
    bottom: -5,
    right: -5,
    position: "absolute",
    height: 150,
    width: 150,
  },
  cardImg: {
    height: 100,
    width: 100,
  },
  imageBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  elevation: {
    elevation: 10,
  },
});

export default WishlistCard;