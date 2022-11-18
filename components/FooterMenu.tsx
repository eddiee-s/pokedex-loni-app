import React, { FC } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Heart from "react-native-vector-icons/FontAwesome";
import Home from "react-native-vector-icons/Entypo";
import Account from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  route?: string;
}

type RootStackParamList = {
  Home: undefined;
  Wishlist: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const FooterMenu: FC<Props> = ({ route }) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [loaded] = useFonts({
    FlexoDemi: require("../assets/fonts/Flexo/Flexo-Demi.ttf"),
    FlexoRegular: require("../assets/fonts/Flexo/Flexo-Regular.ttf"),
    FlexoBlack: require("../assets/fonts/Flexo/Flexo-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.nav}
        onPress={() => navigation.navigate("Home")}
      >
        <Home
          name="home"
          size={22}
          color={route === "Home" ? "#7076C9" : "#757575"}
        />
        <Text
          style={[
            styles.navText,
            { color: route === "Home" ? "#7076C9" : "#757575" },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nav}
        onPress={() => navigation.navigate("Wishlist")}
      >
        <Heart
          name="heart"
          size={22}
          color={route === "Wishlist" ? "#7076C9" : "#757575"}
        />
        <Text
          style={[
            styles.navText,
            { color: route === "Wishlist" ? "#7076C9" : "#757575" },
          ]}
        >
          Wishlist
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.nav}>
        <Account
          name="account"
          size={22}
          color={route === "Account" ? "#7076C9" : "#757575"}
        />
        <Text
          style={[
            styles.navText,
            { color: route === "Account" ? "#7076C9" : "#757575" },
          ]}
        >
          My Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    borderWidth: 1,
    borderColor: "#00000029",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nav: {
    flex: 1,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontFamily: "FlexoDemi",
    fontSize: 12,
    color: "#757575",
    letterSpacing: 1,
  },
});

export default FooterMenu;