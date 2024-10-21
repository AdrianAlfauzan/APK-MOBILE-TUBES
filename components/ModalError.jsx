import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

export default function ModalError({ apakahModalGagalTerlihat, tutupModalGagal }) {
  return (
    <Modal isVisible={apakahModalGagalTerlihat} animationIn="bounceIn" animationOut="bounceOut">
      <View className="flex justify-center items-center w-94 max-h-96 bg-slate-200 rounded-lg p-5">
        <Image source={require("../assets/icon/silang.png")} className="w-16 h-16 mb-4" />
        <Text className="text-lg text-red-500">Silahkan isi email dan password.</Text>
        <TouchableOpacity onPress={tutupModalGagal} className="bg-red-500 rounded-lg px-4 py-2 mt-3">
          <Text className="text-white">Tutup</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
