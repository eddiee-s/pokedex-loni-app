import { useFonts } from "expo-font";
import { FC, useState } from "react";
import { StyleSheet, Dimensions, Text } from "react-native";
import { TabView, TabBar, SceneRendererProps, NavigationState } from "react-native-tab-view";
import { DetailsTabPropsType } from "../../types";

import AboutRoute from './About'
import BaseStatsRoute from './BaseStats'
import EvolutionRoute from './Evolution'
import MovesRoute from './Moves'

type State = NavigationState<RouteType>;

type RouteType = {
  key: string;
  title?: string;
}

const renderTabBar = ( props: SceneRendererProps & { navigationState: State }) => (

  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: "#7076C9",
      padding: 2,
      marginBottom: -3,
    }}
    style={{ backgroundColor: "#fff" }}
    renderLabel={({ route, focused,  }) => (
      <Text 
        style={{
            fontFamily: "FlexoDemi",
            color: focused ? "rgba(53, 53, 58, 1)" : "rgba(53, 53, 58, 0.5)", 
            fontSize: 14,
            margin: 1, 
            paddingBottom:5,
        }}>
        {route.title}
      </Text>
    )}
  />
);

const initialLayout = { width: Dimensions.get("window").width };

const DetailsTabs:FC<DetailsTabPropsType> = ({data, height, weight, experience, abilities, stats}) => {
    useFonts({
        FlexoDemi: require("../../assets/fonts/Flexo/Flexo-Demi.ttf"),
        FlexoRegular: require("../../assets/fonts/Flexo/Flexo-Regular.ttf"),
        FlexoBlack: require("../../assets/fonts/Flexo/Flexo-Black.ttf"),
      });

  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: "about", title: "About" },
    { key: "baseStats", title: "Base Stats" },
    { key: "evolution", title: "Evolution" },
    { key: "moves", title: "Moves" },
  ]);

  const renderScene:FC<{route:RouteType}> = ({route}) => {
    switch (route.key) {
      case 'about':
        return <AboutRoute data={data} height={height} weight={weight} experience={experience} abilities={abilities}/>;
      case 'baseStats':
        return <BaseStatsRoute stats={stats}/>;
      case 'evolution':
        return <EvolutionRoute url={data?.evolution_chain?.url}/>;
      case 'moves':
        return <MovesRoute />;
      default:
        return null;
    }
  };

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  indicatorStyle: {
    backgroundColor: "#fff",
    padding: 1.5,
    marginBottom: -2,
  },
  divider: {
    zIndex: 100,
    position: "absolute",
    width: 1,
    height: 48,
    backgroundColor: "black",
    alignSelf: "center",
  },
});

export default DetailsTabs;