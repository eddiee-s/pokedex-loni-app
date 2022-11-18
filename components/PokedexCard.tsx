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
import { POKEMON_TYPE_COLORS } from "../constants";
import { CardProps, PokemonColorType, PokemonType } from "../types";
import pokeball from "../assets/pokeball.png";


const PokedexCard: FC<CardProps> = ({ data, onPress = (a) => a }) => {

  const [loaded] = useFonts({
    FlexoDemi: require("../assets/fonts/Flexo/Flexo-Demi.ttf"),
    FlexoRegular: require("../assets/fonts/Flexo/Flexo-Regular.ttf"),
    FlexoBold: require("../assets/fonts/Flexo/Flexo-Bold.ttf"),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
                  {
                    backgroundColor:
                      POKEMON_TYPE_COLORS[pokeColor as keyof PokemonColorType],
                  },
                ]}
              >
                <View style={styles.cardContainer}>
                  <View>
                    <Text
                      style={[
                        styles.cardTextHeading,
                        loaded && { fontFamily: "FlexoBold" },
                      ]}
                    >
                      {pokemon.name}
                    </Text>
                    {pokemon.types.map((item, index) => {
                      return (
                        <View key={index} style={styles.cardTextTypesContainer}>
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 4,
    marginBottom: 10,
    overflow: "hidden",
  },
  card: {
    position: "relative",
    width: "45%",
    height: 130,
    marginVertical: 4,
    borderRadius: 20,
    elevation: 10,
  },
  cardContainer: {
    flex: 1,
    alignItems: "baseline",
    paddingLeft: 15,
    paddingTop: 5,
  },
  cardTextHeading: {
    fontSize: 16,
    color: "#FFFF",
    // fontFamily: "FlexoBold",
    textTransform: "capitalize",
    marginVertical: 10,
  },
  cardTextTypesContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    marginBottom: 5,
    alignSelf: "baseline",
    paddingVertical: 3,
    paddingHorizontal: 13,
    borderRadius: 20,
  },
  cardTextTypes: {
    fontSize: 12,
    color: "#FFFF",
    // fontFamily: "FlexoDemi",
    textTransform: "capitalize",
  },
  cardImage: {
    bottom: -2,
    right: -8,
    position: "absolute",
    height: 100,
    width: 100,
  },
  cardImg: {
    height: 80,
    width: 88,
  },
  imageBg: {
    flex: 1,
    justifyContent: "center",
  },
});

export default PokedexCard;