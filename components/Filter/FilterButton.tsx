import { FC, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Options from "react-native-vector-icons/Ionicons";
import FilterModal from "./FilterModal";

const FilterButton: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Options name="ios-options-outline" size={36} color={"#fff"} />
      </TouchableOpacity>

      <FilterModal
        modalVisible={modalVisible}
        onPress={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 80,
    right: 15,
  },
  button: {
    backgroundColor: "#7076C9",
    width: 56,
    height: 56,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "FlexoBold",
  },
});

export default FilterButton;