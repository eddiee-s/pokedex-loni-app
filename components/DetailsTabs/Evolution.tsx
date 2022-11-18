import { useFonts } from "expo-font";
import { RootState } from "../../redux/store";
import { usePokemonsEvolutionChainQuery } from "../../redux/features/api/pokemons-api-slice";
import { FC, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import pokeball from "../../assets/pokeball-w.png";
import handleEvoChain from '../../utils/pokemon-evolution-chain'
import { EvolutionResultType} from "../../types";

const Evolution:FC<{ url: string | undefined }> = ({ url }) => {
  useFonts({
    FlexoDemi: require("../../assets/fonts/Flexo/Flexo-Demi.ttf"),
    FlexoBold: require("../../assets/fonts/Flexo/Flexo-Bold.ttf"),
    FlexoBlack: require("../../assets/fonts/Flexo/Flexo-Black.ttf"),
  });

  const { data = [], isSuccess } = usePokemonsEvolutionChainQuery(url);
  const [evolutionData, setEvolutionData] = useState<EvolutionResultType[]>();

  const { allPokemons } = useSelector((state: RootState) => state.pokemons);

  useEffect(() => {
    if (isSuccess) {
      const result = handleEvoChain(data, allPokemons);
      setEvolutionData(result);
    } else return;
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={[styles.columnHeading]}>Evolution Chain</Text>
            <View style={styles.column}>
              {evolutionData?.map((pokemon) => {
                return (
                  <View key={pokemon.id} style={{ marginHorizontal: 10 }}>
                    <View style={styles.title}>
                      <Text style={styles.levelText}>
                        {" "}
                        Level {pokemon.min_level}
                      </Text>
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
                    <View style={styles.title}>
                      <Text style={styles.titleText}>
                        {pokemon.species_name}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  column: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  columnHeading: {
    fontSize: 18,
    fontFamily: "FlexoBlack",
    color: "rgba(53, 53, 58, 0.8)",
  },
  title: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    fontFamily: "FlexoBold",
    color: "rgba(53, 53, 58, 0.8)",
    textTransform: "uppercase",
  },
  levelText: {
    fontSize: 12,
    fontFamily: "FlexoBold",
    color: "rgba(53, 53, 58, 0.8)",
  },
  cardImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
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

export default Evolution;