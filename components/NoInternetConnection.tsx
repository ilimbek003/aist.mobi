import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const NoInternetConnection = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Отсутствует подключение к интернету</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 18,
    color: "red",
  },
});

export default NoInternetConnection;
