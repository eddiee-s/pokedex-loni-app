import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const MenuButton = () => {
  return (
    <View style={styles.menuEclipse}>
      <View style={styles.menuEclipseRect} />
      <TouchableOpacity style={styles.menu}>
        <View style={styles.menuIcon}>
          <Icon name={"list-ul"} size={24} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuEclipse: {
    position: "absolute",
    left: 279,
    width: 176,
    height: 176,
    flexDirection: "row",
    borderRadius: 100,
    borderWidth: 44,
    borderColor: "#F5F3F6",
    borderRight: 10,
    borderBottom: 0,
    opacity: 1,
    alignItems: "center",
  },
  menuEclipseRect: {
    width: 44,
    height: 11,
    backgroundColor: "white",
    overflow: "hidden",
    marginLeft: -44,
  },
  menu: {
    flex: 1,
    borderBottomColor: "#eeee",
    alignItems: "center",
  },
  menuIcon: {
    height: 64,
    width: 64,
    backgroundColor: "#F5F3F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MenuButton;