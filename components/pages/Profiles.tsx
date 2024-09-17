import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Profiles = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профиль</Text>
      <View style={styles.block}>
        <Image
          style={styles.bar}
          source={require("../../assets/images/profiles.png")}
        />
        <Text style={styles.titles}>Вход</Text>
        <Text style={styles.project}>
          Войдите в аккаунт, чтобы авторизоваться
        </Text>
        <Pressable style={styles.button} onPress={() => router.push("/auth/login")}>
          <Text style={styles.text}>Войти</Text>
        </Pressable>
      </View>
      <View style={styles.relative}>
        <Text style={styles.projects}>
          Нажимая на кнопку «Войти», вы принимаете условия
        </Text>
        <Text style={styles.projects_one}>Пользовательского соглашения</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  block: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 40,
    textAlign: "center",
  },
  titles: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
  },
  bar: {
    width: 100,
    height: 100,
  },
  text: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 14,
    fontWeight: "500",
  },
  project: {
    color: "rgba(160, 160, 160, 1)",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(55, 9, 238, 1)",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  relative: {
    marginTop: 310,
    flexDirection: "column",
    alignItems: "center",
  },
  projects: {
    fontSize: 11,
    fontWeight: "400",
    color: "rgba(172, 172, 172, 1)",
  },
  projects_one: {
    fontSize: 11,
    fontWeight: "400",
    color: "rgba(55, 9, 238, 1)",
  },
});

export default Profiles;
