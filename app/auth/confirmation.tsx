import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { getPhoneNumber } from "../../components/SecureStore/SecureStore";
import axios from "axios";
import { router } from "expo-router";
import { saveToken } from "../../components/SecureStore/SecureStore";

const Confirmation = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const number = await getPhoneNumber();
        setPhoneNumber(String(number));
      } catch (error) {
        Alert.alert("Ошибка", "Не удалось получить номер телефона.");
      }
    };
    fetchPhoneNumber();
  }, []);

  const handleConfirmation = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://aist.mobi/auth/verify",
        {
          phone: phoneNumber,
          code: otpCode,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.response === true) {
        Alert.alert("Успех", "Вы успешно авторизовались");
        await saveToken(response.data.token);
        router.push("/");
      } else {
        Alert.alert("Ошибка", response.data.message);
      }
    } catch (error) {
      Alert.alert(
        "Ошибка",
        "Произошла ошибка при подтверждении. Проверьте введённые данные и попробуйте снова."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Подтверждениe кода</Text>
      <Text style={styles.projects}>Введите смс код подтверждения</Text>
      <View style={styles.block}>
        <OTPTextInput
          inputCount={6}
          handleTextChange={(code) => setOtpCode(code)}
          containerStyle={styles.otpContainer}
          textInputStyle={styles.otpInput}
          tintColor={"rgba(55, 9, 238, 1)"}
          defaultValue={otpCode}
        />
        <Pressable
          style={styles.button}
          onPress={handleConfirmation}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.text}>Войти</Text>
          )}
        </Pressable>
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
  otpContainer: {
    marginBottom: 10,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderColor: "rgba(55, 9, 238, 1)",
    textAlign: "center",
    color: "#000",
  },
});

export default Confirmation;
