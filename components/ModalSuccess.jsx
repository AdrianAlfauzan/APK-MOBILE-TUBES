import React from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import Modal from "react-native-modal";

export default function ModalSuccess({ apakahModalTerlihat, apakahCeklisHijau, tutupModal, ceklisTranslateY }) {
  return (
    <Modal isVisible={apakahModalTerlihat} animationIn="zoomIn" animationOut="zoomOut">
      <View className="flex justify-center items-center w-94 max-h-96 bg-slate-200 rounded-lg p-5">
        <Animated.View style={{ transform: [{ translateY: ceklisTranslateY }] }}>
          <Image source={apakahCeklisHijau ? require("../assets/icon/CeklisHijau.png") : require("../assets/icon/CeklisHitam.png")} className={apakahCeklisHijau ? "w-20 h-20 mb-4" : "w-16 h-16 mb-4"} />
        </Animated.View>
        <Text className="text-lg text-black">{apakahCeklisHijau ? "Login Berhasil!" : ""}</Text>
        {apakahCeklisHijau && (
          <TouchableOpacity onPress={tutupModal} className="bg-orange-500 rounded-lg px-4 py-2 mt-3">
            <Text className="text-white">Tutup</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}
