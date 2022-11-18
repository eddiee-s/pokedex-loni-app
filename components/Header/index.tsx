import { useFonts } from "expo-font";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import MenuButton from "./MenuButton";
import MenuPokeball from "./MenuPokeball";

interface Props {
  title?: string;
  hasButton?: boolean;
  pokeball?: boolean;
}

const Header: FC<Props> = ({ title, hasButton = true, pokeball = false }) => {
  const [loaded] = useFonts({
    FlexoBold: require("../../assets/fonts/Flexo/Flexo-Bold.ttf"),
  });

  return (
    <View style={styles.header}>
      <Text style={[styles.text, { fontFamily: loaded ? "FlexoBold" : "" }]}>
        {title}
      </Text>
      {hasButton && <MenuButton />}
      {pokeball && <MenuPokeball />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 15,
    top: -18,
    justifyContent: "space-between",
    alignItems: "center",
  },

  text: {
    color: "#35353A",
    fontSize: 24,
  },
});

export default Header;