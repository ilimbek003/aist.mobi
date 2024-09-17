import { savePhoneNumber } from "@/components/SecureStore/SecureStore";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const fullPhoneNumber = `996${phoneNumber}`;
      const response = await axios.post(
        "https://aist.mobi/auth/register",
        { phone: fullPhoneNumber },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.response === true) {
        Alert.alert("Успех", response.data.message);
        await savePhoneNumber(fullPhoneNumber);
        router.push("/auth/confirmation");
      } else {
        Alert.alert(
          "Ошибка",
          response.data.message || "Что-то пошло не так. Попробуйте снова."
        );
      }
    } catch (error) {
      Alert.alert(
        "Ошибка",
        "Phone number must be entered in the format: +996*********** Up to 9 digits allowed."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
      <Text style={styles.projects}>Отправим смс с кодом подтверждения</Text>
      <View style={styles.block}>
        <View>
          <Text style={styles.text_tel}>+996</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите номер телефона"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <Pressable
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.text}>Войти</Text>
          )}
        </Pressable>
        <View style={styles.relative}>
          <Text style={styles.project}>
            Нажимая на кнопку «Войти», вы принимаете условия
          </Text>
          <Text style={styles.projects_one}>Пользовательского соглашения</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  block: {
    paddingHorizontal: 20,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 40,
    textAlign: "center",
    marginBottom: 10,
  },
  projects: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(172, 172, 172, 1)",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 55,
    paddingRight: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(25, 25, 25, 1)",
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
  text: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 14,
    fontWeight: "500",
  },
  relative: {
    marginTop: 390,
    flexDirection: "column",
    alignItems: "center",
  },
  project: {
    fontSize: 11,
    fontWeight: "400",
    color: "rgba(172, 172, 172, 1)",
  },
  projects_one: {
    fontSize: 11,
    fontWeight: "400",
    color: "rgba(55, 9, 238, 1)",
  },
  inputBlock: {
    position: "relative",
  },
  text_tel: {
    position: "absolute",
    top: 15,
    left: 15,
    fontSize: 16,
    fontWeight: "400",
    zIndex: 999,
  },
});

export default Login;
