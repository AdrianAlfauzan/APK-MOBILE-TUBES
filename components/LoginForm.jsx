import { Image, Text, View, TextInput, TouchableOpacity, Animated } from "react-native";
import React, { useState, useRef } from "react";
import Modal from "react-native-modal";
import { mulaiAnimasi, mulaiCeklisAnimasi } from "../utils/animations";
import { useProsesBar } from "../hooks/useProsesBar";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTerlihat, setPasswordTerlihat] = useState(false);
  const [emailSelesai, setEmailSelesai] = useState(false);
  const [passwordSelesai, setPasswordSelesai] = useState(false);
  const [loginSelesai, setLoginSelesai] = useState(false);
  const [apakahModalTerlihat, setModalTerlihat] = useState(false);
  const [apakahModalGagalTerlihat, setApakahModalGagalTerlihat] = useState(false);
  const [apakahCeklisHijau, setApakahCeklisHijau] = useState(false);

  const proses = useProsesBar(emailSelesai, passwordSelesai, loginSelesai);
  const posisiGambar = useRef(new Animated.Value(-300)).current;
  const posisiLogin = useRef(new Animated.Value(300)).current;
  const posisiCeklis = useRef(new Animated.Value(0)).current;

  const ceklisTranslateY = posisiCeklis.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  const handleLogin = () => {
    if (emailSelesai && passwordSelesai) {
      setLoginSelesai(true);
      setModalTerlihat(true);
      mulaiCeklisAnimasi(posisiCeklis, setApakahCeklisHijau);
    } else {
      setApakahModalGagalTerlihat(true);
    }
  };

  const togglePasswordTerlihat = () => {
    setPasswordTerlihat(!passwordTerlihat);
  };

  const bersihkanEmail = () => {
    setEmail("");
    setEmailSelesai(false);
  };

  const tutupModal = () => {
    setModalTerlihat(false);
  };

  const tutupModalGagal = () => {
    setApakahModalGagalTerlihat(false); // Hide error modal
  };

  React.useEffect(() => {
    mulaiAnimasi(posisiGambar, posisiLogin);
  }, []);

  return (
    <View className=" bg-yellow-100 justify-center">
      <Animated.View style={{ transform: [{ translateY: posisiGambar }] }} className="items-center justify-center h-96 py-2 mb-3">
        <View className="w-full h-96 overflow-hidden rounded-b-3xl">
          <Image source={require("../assets/images/Chicken.png")} className="w-full h-full" />
        </View>
      </Animated.View>
      <View className=" bg-slate-500 w-96 rounded-full m-auto overflow-hidden h-4 mb-2">
        <Animated.View
          style={{
            backgroundColor: "dodgerblue",
            height: "100%",
            width: proses.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          }}
        />
      </View>
      <Animated.View style={{ transform: [{ translateY: posisiLogin }] }} className="items-center bg-white rounded-t-3xl">
        <Text className="p-5 text-3xl ">Login with email address </Text>
        <View className="gap-6 ">
          <View className="flex-row justify-between items-center border rounded-xl w-96 h-16">
            <View className="border-r-2 p-2 flex items-center">
              <Image source={require("../assets/icon/email.png")} className="w-6 h-6" />
            </View>
            <View className="flex-1">
              <TextInput
                className="w-full h-full p-2"
                placeholder="Masukkan email anda"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailSelesai(text.trim() !== "");
                }}
              />
            </View>
            {email !== "" && (
              <TouchableOpacity className="absolute right-2 top-5" onPress={bersihkanEmail}>
                <Image source={require("../assets/icon/silang.png")} className="w-6 h-6" />
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-row justify-between items-center border rounded-xl w-96 h-16">
            <View className="border-r-2 p-2">
              <Image source={require("../assets/icon/lock.png")} className="w-6 h-6" />
            </View>
            <View className="flex-1">
              <TextInput
                className="w-full h-full p-2"
                placeholder="Masukkan password anda"
                secureTextEntry={!passwordTerlihat}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordSelesai(text.trim() !== "");
                }}
              />
            </View>
            <TouchableOpacity className="absolute right-2 top-5" onPress={togglePasswordTerlihat}>
              <Image source={passwordTerlihat ? require("../assets/icon/unhide.png") : require("../assets/icon/hide.png")} className="w-6 h-6" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleLogin}>
            <View className="w-96 h-16 bg-orange-500 rounded-xl overflow-hidden items-center justify-center">
              <Text className="text-center text-white text-lg">Login</Text>
            </View>
          </TouchableOpacity>

          <View className="items-center rounded-lg ">
            <Text className="text-lg text-orange-500">Forgot Password?</Text>
            <View className="flex-row gap-2">
              <Text className="text-lg text-black">Don't have an account?</Text>
              <Text className="text-lg text-orange-500">Register</Text>
            </View>
          </View>
        </View>
      </Animated.View>
      <Modal isVisible={apakahModalTerlihat} animationIn="zoomIn" animationOut="zoomOut">
        <View className="flex justify-center items-center w-94 max-h-96 bg-slate-200 rounded-lg p-5">
          <Animated.View style={{ transform: [{ translateY: ceklisTranslateY }] }}>
            <Image source={apakahCeklisHijau ? require("../assets/icon/CeklisHijau.png") : require("../assets/icon/CeklisHitam.png")} className={apakahCeklisHijau ? "w-20 h-20 mb-4" : "w-16 h-16 mb-4"} />
          </Animated.View>

          <Text className="text-lg text-black">{apakahCeklisHijau ? "Login Berhasil!" : ""}</Text>

          {!apakahCeklisHijau && (
            <View className="flex flex-col items-center mt-2">
              <Image source={require("../assets/icon/RingBasket.png")} className="w-24 h-12" />
            </View>
          )}

          {apakahCeklisHijau && (
            <TouchableOpacity onPress={tutupModal} className="bg-orange-500 rounded-lg px-4 py-2 mt-3">
              <Text className="text-white">Tutup</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
      <Modal isVisible={apakahModalGagalTerlihat} animationIn="bounceIn" animationOut="bounceOut">
        <View className="flex justify-center items-center w-94 max-h-96 bg-slate-200 rounded-lg p-5">
          <Image source={require("../assets/icon/silang.png")} className="w-16 h-16 mb-4" />
          <Text className="text-lg text-red-500">Silahkan isi email dan password.</Text>
          <TouchableOpacity onPress={tutupModalGagal} className="bg-red-500 rounded-lg px-4 py-2 mt-3">
            <Text className="text-white">Tutup</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
