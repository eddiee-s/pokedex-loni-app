import { FC } from "react";
import { StyleSheet, View } from "react-native";

const MenuPokeball: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.menuEclipse}>
        <View style={styles.menu}>
          <View style={styles.menuIcon}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -240,
    width: 400,
    position: "absolute",
    alignItems: "center",
    overflow: "hidden",
    zIndex: -1000,
  },
  menuEclipse: {
    // left:279,
    width: 390,
    height: 390,
    flexDirection: "row",
    borderRadius: 200,
    borderWidth: 90,
    borderColor: "#F5F3F6",
    opacity: 1,
    alignItems: "center",
  },
  menu: {
    flex: 1,
    borderBottomColor: "#eeee",
    alignItems: "center",
  },
  menuIcon: {
    height: 130,
    width: 130,
    backgroundColor: "#F5F3F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MenuPokeball;