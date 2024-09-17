import { Link, router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AboutService = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>О сервисе</Text>
      <View>
        <Text style={styles.text}>
          aist_mobi сервис. aist_mobi позволяет совершать обмены электронных
          валют в огромное количество направлений. Совершать обмены с aist_mobi
          можно с любого устройства: мобильный телефон, планшет или компьютер.
        </Text>
        <Text style={styles.text}>
          aist_mobi - система, созданная на базе современного программного
          обеспечения и содержащая весь набор необходимых функций для удобной и
          безопасной конвертации наиболее распространенных видов электронных
          денег.
        </Text>
        <Text style={styles.text}>
          Наш обменник электронных валют создан для тех, кто хочет быстро,
          безопасно и по выгодному курсу обменять такие виды электронных валют
          как: Perfect Money, Payeer, AdvCash, Qiwi, Yandex, криптовалюты
          Bitcoin, Bitcoin Cash, Ethereum, Litecoin и другие.
        </Text>
      </View>
      <View style={styles.flex}>
        <Text style={styles.made}>made with❤</Text>
        <Link style={styles.link} href="https://t.me/navisdevs">
          Navisdevs
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 40,
    textAlign: "center",
  },
  text: {
    color: "rgba(19, 19, 19, 1)",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 20,
  },
  made: {
    color: "rgba(152, 152, 152, 1)",
    fontSize: 14,
    fontWeight: "500",
  },
  link: {
    color: "rgba(55, 9, 238, 1)",
    fontSize: 16,
    fontWeight: "600",
  },
  flex: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
});

export default AboutService;
