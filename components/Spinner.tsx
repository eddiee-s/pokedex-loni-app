import { FC } from "react";
import { ActivityIndicator, View } from "react-native";

interface Props {
  size?: number | "small" | "large" | undefined;
}

const Spinner: FC<Props> = ({ size = "small" }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={size} />
    </View>
  );
};

export default Spinner;