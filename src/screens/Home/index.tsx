import React, { useEffect, useState } from "react";
import { Dimensions, StatusBar, TouchableOpacity, View } from "react-native";

import { Fontisto } from "@expo/vector-icons";

import { styles } from "./styles";
import { theme } from "../../styles/theme";
import { Header } from "../components/Header";
import { Svg, Circle, Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  interpolate,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export function Home() {
  const { width, height } = Dimensions.get("window");
  const [percent, setPercent] = useState(0);
  const heightAnimated = useSharedValue(1);
  const today = format(new Date(), "dd/MM/yyyy");

  const waveAnimated = useSharedValue(5);
  const buttonBorderAnimated = useSharedValue(0);

  const buttonProps = useAnimatedProps(() => {
    return {
      strokeWidth: interpolate(
        buttonBorderAnimated.value,
        [0, 0.5, 1],
        [17, 40, 17]
      ),
    };
  });

  const svgContainerProps = useAnimatedProps(() => {
    return {
      viewBox: `0 0 ${width} ${heightAnimated.value}`,
      height: heightAnimated.value,
    };
  });

  const firstWaveProps = useAnimatedProps(() => {
    return {
      d: `
        M 0 0
        Q 45 ${waveAnimated.value} 90 0
        T 180 0
        T 270 0
        T 360 0
        T 900 0
        T 540 0
        V ${heightAnimated.value}
        H 0
        Z
      `,
    };
  });

  const secondWaveProps = useAnimatedProps(() => {
    return {
      d: `
        M 0 0
        Q 35 ${waveAnimated.value + 5} 70 0
        T 140 0
        T 210 0
        T 280 0
        T 360 0
        T 420 0
        V ${heightAnimated.value}
        H 0
        Z
      `,
    };
  });

  function handleDrink() {
    buttonBorderAnimated.value = 0;
    waveAnimated.value = 5;

    buttonBorderAnimated.value = withTiming(1, {
      duration: 500,
      easing: Easing.ease,
    });

    if (percent === 100) {
      setPercent(0);
      AsyncStorage.removeItem(today);
      return;
    }

    setPercent((state) => state + 10);
  }

  useEffect(() => {
    const nextPercent = percent === 100 ? 110 : percent;
    heightAnimated.value = withTiming(
      (height + StatusBar.currentHeight || 0) * 2 * (nextPercent / 100),
      {
        duration: 1000,
        easing: Easing.ease,
      }
    );
    waveAnimated.value = withRepeat(
      withTiming(17, {
        duration: 500,
        easing: Easing.ease,
      }),
      2,
      true
    );
  }, [percent]);

  useEffect(() => {
    if (percent === 0) return;

    AsyncStorage.setItem(today, percent.toString());
  }, [percent]);

  useEffect(() => {
    AsyncStorage.getItem(today).then((store) => {
      if (store) {
        setPercent(Number(store));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header ml={(percent * 100 * 10) / 100} percent={percent} />
      <AnimatedSvg width={width} animatedProps={svgContainerProps}>
        <AnimatedPath
          animatedProps={firstWaveProps}
          fill={theme.colors.blue100}
          transform="translate(0, 10)"
        />
        <AnimatedPath
          animatedProps={secondWaveProps}
          fill={theme.colors.blue70}
          transform="translate(0, 15)"
        />
      </AnimatedSvg>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleDrink}
          style={styles.button}
          activeOpacity={0.9}
        >
          <Svg width={120} height={120}>
            <AnimatedCircle
              animatedProps={buttonProps}
              cx={60}
              cy={60}
              r={40}
              fill={theme.colors.blue100}
              stroke={theme.colors.blue90}
              strokeOpacity={0.5}
            />
          </Svg>
          <Fontisto
            name={percent === 100 ? "stop" : "blood-drop"}
            size={32}
            color={theme.colors.blue90}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
