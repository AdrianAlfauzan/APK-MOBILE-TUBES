import { Animated } from "react-native";

export const mulaiAnimasi = (posisiGambar, posisiLogin) => {
  Animated.parallel([
    Animated.timing(posisiGambar, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }),
    Animated.timing(posisiLogin, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }),
  ]).start();
};

export const mulaiCeklisAnimasi = (posisiCeklis, setApakahCeklisHijau) => {
  posisiCeklis.setValue(0);
  setApakahCeklisHijau(false);

  const pantulan = Animated.sequence([
    Animated.timing(posisiCeklis, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }),
    Animated.timing(posisiCeklis, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }),
  ]);

  Animated.loop(pantulan, { iterations: 4 }).start(({ finished }) => {
    if (finished) {
      setApakahCeklisHijau(true);
      posisiCeklis.setValue(0);
    }
  });
};
