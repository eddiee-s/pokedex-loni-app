import { useFonts } from "expo-font";
import { FC } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DetailsTabPropsType, EggGroupType, PokemonType } from "../../types";
import {
  getPokemonHeightFt,
  getPokemonHeightMeters,
  getPokemonWeightKg,
  getPokemonWeightLbs,
} from "../../utils/pokemon-mesures";

const About: FC<DetailsTabPropsType> = ({
  data,
  height,
  weight,
  experience,
  abilities,
}) => {
  const pokemonData = data;
  const { flavor_text_entries, egg_groups, color } = pokemonData as PokemonType;

  const description = flavor_text_entries[6].flavor_text.replace(
    /[\r\n]/gm,
    " "
  );

  useFonts({
    FlexoDemi: require("../../assets/fonts/Flexo/Flexo-Demi.ttf"),
    FlexoRegular: require("../../assets/fonts/Flexo/Flexo-Regular.ttf"),
    FlexoBlack: require("../../assets/fonts/Flexo/Flexo-Black.ttf"),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>{description}..</Text>
          <View style={styles.card}>
            <View>
              <Text style={styles.cardHeading}>Height</Text>
              <Text style={styles.cardText}>
                {`${getPokemonHeightMeters(height)} (${getPokemonHeightFt(
                  height
                )})`}
              </Text>
            </View>
            <View>
              <Text style={styles.cardHeading}>Weight</Text>
              <Text style={styles.cardText}>
                {getPokemonWeightKg(weight)} ({getPokemonWeightLbs(weight)})
              </Text>
            </View>
          </View>
          <View>
            <Text style={[styles.columnHeading, { marginVertical: 10 }]}>
              Breeding
            </Text>
            <View style={styles.column}>
              <Text style={styles.cardHeading}>Egg Groups:</Text>
              {egg_groups.map((egg: EggGroupType, i: number) => (
                <Text
                  key={i}
                  style={[
                    styles.cardText,
                    { marginLeft: 10, textTransform: "capitalize" },
                  ]}
                >
                  {egg.name}{" "}
                </Text>
              ))}
            </View>
            <View style={styles.column}>
              <Text style={styles.cardHeading}>Color:</Text>
              <Text
                style={[
                  styles.cardText,
                  { marginLeft: 10, textTransform: "capitalize" },
                ]}
              >
                {color.name}{" "}
              </Text>
            </View>
          </View>
          <View>
            <Text style={[styles.columnHeading, { marginVertical: 10 }]}>
              Training
            </Text>
            <View style={styles.column}>
              <Text style={styles.cardHeading}>Base Exp:</Text>
              <Text
                style={[
                  styles.cardText,
                  { marginLeft: 10, textTransform: "capitalize" },
                ]}
              >
                {" "}
                {experience}{" "}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.cardHeading}>Abilities:</Text>
              {abilities.map((item, i: number) => (
                <Text
                  key={i}
                  style={[
                    styles.cardText,
                    { marginLeft: 10, textTransform: "capitalize" },
                  ]}
                >
                  {" "}
                  {item.ability.name}{" "}
                </Text>
              ))}
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
  text: {
    fontFamily: "FlexoDemi",
    fontSize: 12,
    lineHeight: 14,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginVertical: 15,
    borderRadius: 10,
    elevation: 8,
  },
  cardHeading: {
    fontSize: 12,
    fontFamily: "FlexoBlack",
    color: "rgba(53, 53, 58, 0.5)",
    paddingBottom: 5,
  },
  cardText: {
    fontSize: 12,
    fontFamily: "FlexoBlack",
    color: "rgba(53, 53, 58, 0.8)",
  },
  column: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    // alignItems:'center',
    // justifyContent: 'flex-start',
  },
  columnHeading: {
    fontSize: 16,
    fontFamily: "FlexoBlack",
    color: "rgba(53, 53, 58, 0.8)",
  },
});

export default About;