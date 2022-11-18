import { FC } from "react";
import { useFonts } from "expo-font";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { StatsType } from "../../types";

interface Props {
  stats: StatsType[] | undefined;
}

const BaseStats: FC<Props> = ({ stats }) => {
  const total = stats
    ?.map((item) => item.base_stat)
    .reduce((prev, acc) => acc + prev, 0) as number;

  useFonts({
    FlexoDemi: require("../../assets/fonts/Flexo/Flexo-Demi.ttf"),
    FlexoRegular: require("../../assets/fonts/Flexo/Flexo-Regular.ttf"),
    FlexoBold: require("../../assets/fonts/Flexo/Flexo-Bold.ttf"),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {stats?.map((item, i) => {
            return (
              <View key={i} style={styles.stats}>
                <View style={styles.title}>
                  <Text style={styles.statTitle}>{item.stat.name}</Text>
                  <Text style={styles.statNumber}>{item.base_stat}</Text>
                </View>
                <View>
                  <Progress.Bar
                    progress={item.base_stat / 100}
                    width={200}
                    unfilledColor={"#F5F3F6"}
                    borderColor={"#F5F3F6"}
                    color={`${item.base_stat > 50 ? "#7FC99B" : "#DD6571"}`}
                  />
                </View>
              </View>
            );
          })}
          <View style={styles.stats}>
            <View style={styles.title}>
              <Text style={styles.statTitle}>Total</Text>
              <Text style={styles.statNumber}>{total}</Text>
            </View>
            <View>
              <Progress.Bar
                progress={total / 1000}
                width={200}
                unfilledColor={"#F5F3F6"}
                borderColor={"#F5F3F6"}
                color={`${total > 50 ? "#7FC99B" : "#DD6571"}`}
              />
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
    paddingVertical: 30,
  },
  stats: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingRight: 15,
  },
  statTitle: {
    fontSize: 14,
    textTransform: "capitalize",
    fontFamily: "FlexoBold",
    color: "rgba(53, 53, 58, 0.5)",
    paddingBottom: 5,
  },
  statNumber: {
    fontSize: 14,
    fontFamily: "FlexoBold",
    color: "rgba(53, 53, 58, 0.8)",
  },
});

export default BaseStats;