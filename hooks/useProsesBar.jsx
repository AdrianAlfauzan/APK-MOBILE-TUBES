import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const useProsesBar = (emailSelesai, passwordSelesai, loginSelesai) => {
  const proses = useRef(new Animated.Value(0)).current;

  const perbaruiProses = (langkahBar) => {
    Animated.timing(proses, {
      toValue: langkahBar / 3,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    let langkahBar = 0;
    if (emailSelesai) langkahBar += 1;
    if (passwordSelesai) langkahBar += 1;
    if (loginSelesai) langkahBar += 1;

    perbaruiProses(langkahBar);
  }, [emailSelesai, passwordSelesai, loginSelesai]);

  return proses;
};
