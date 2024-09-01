import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { theme } from "../../../styles/theme";
import { cups } from "../../../utils/cups";
import { styles } from "./styles";
import AnimatedNumber from "react-native-animated-numbers";

type Props = {
  ml: number;
  percent: number;
};

export function Header({ ml, percent }: Props) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.ml}>{ml}ml</Text>
        <Text style={styles.label}>
          beber água diariamente é fundamental para o bom funcionamento do nosso
          organismo.
        </Text>
      </View>

      <View style={styles.cups}>
        {cups.map((value) => (
          <MaterialCommunityIcons
            key={String(value)}
            name="cup"
            size={32}
            color={percent >= value ? theme.colors.blue90 : theme.colors.gray80}
          />
        ))}
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 50 }}
      >
        <AnimatedNumber
          animateToNumber={percent}
          fontStyle={styles.percentage}
          includeComma={false}
        />
        <Text style={styles.percentage}>%</Text>
      </View>
    </View>
  );
}
