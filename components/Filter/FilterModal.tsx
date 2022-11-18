import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePokemonsQuery } from "../../redux/features/api/pokemons-api-slice";
import { setAllPokemons } from "../../redux/features/slices/pokeSlice";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import Close from "react-native-vector-icons/AntDesign";
import { FiltersType } from "../../types";

const fetchFilters = [
  { id: 1, name: "Show all Pokemons", active: false, value: -1 },
  { id: 2, name: "First 50", active: false, value: 50 },
  { id: 3, name: "First 20", active: true, value: 20 },
];

interface Props {
  modalVisible?: boolean;
  onPress?: () => void;
}

const FilterModal: FC<Props> = ({ modalVisible, onPress }) => {
  const [filters, setFilters] = useState<FiltersType[]>(fetchFilters);
  const [fetchLimit, setfetchLimit] = useState<number>(20);

  const {
    data = [],
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = usePokemonsQuery(fetchLimit);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAllPokemons(data));
    }
  }, [data]);

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Close
              style={styles.button}
              name="closecircle"
              size={20}
              color={"#7076C9"}
              onPress={onPress}
            />

            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderBottomColor: "#35353A",
                borderColor: "transparent",
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingBottom: 5,
                }}
              >
                Filters
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                flexWrap: "wrap",
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              {filters.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      const activeResult = fetchFilters.map((filter) => {
                        if (filter.id === item.id) {
                          filter.active = true;
                          setfetchLimit(+filter.value);
                        } else {
                          filter.active = false;
                        }
                        return filter;
                      });
                      setFilters(activeResult);
                    }}
                  >
                    <Text
                      style={[
                        styles.filter,
                        item.active
                          ? { color: "#fff", backgroundColor: "#7076C9" }
                          : { color: "#7076C9", backgroundColor: "#fff" },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    marginTop: 550,
    marginHorizontal: 4,
    flexDirection: "column",
    backgroundColor: "white",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 25,
    alignItems: "baseline",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    position: "absolute",
    right: -1,
    top: -1,
    borderRadius: 20,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  filter: {
    fontSize: 12,
    marginBottom: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#7076C9",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
});

export default FilterModal;