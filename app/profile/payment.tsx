import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

const Payment = () => {
  const [checkedmap, setCheckedmap] = useState(false);
  const [cardImage, setCardImage] = useState<string | null>(null);

  const handlePre = () => {
    setCheckedmap(!checkedmap);
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Ошибка", "Доступ к камере необходим для этого действия.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      const { uri } = result.assets[0];
      console.log("Setting card image:", uri);
      setCardImage(uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <Pressable onPress={() => router.push("/profile")}>
          <Image
            source={require("../../assets/images/arrow.png")}
            style={styles.arrowIcon}
          />
        </Pressable>
        <Text numberOfLines={1} style={styles.title}>
          Способ оплаты
        </Text>
        <View style={styles.arrowIcon} />
      </View>
      <View style={styles.blocks}>
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={handlePre} style={styles.border}>
              <View
                style={{
                  width: checkedmap ? 11 : 0,
                  height: checkedmap ? 11 : 0,
                  backgroundColor: "rgba(55, 9, 238, 1)",
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Банковская карта</Text>
            </View>
          </View>
          <View style={checkedmap ? styles.block : styles.none}>
            <TouchableOpacity
              onPress={openCamera}
              style={styles.installmentsContainer}
            >
              <View style={styles.cart}>
                {cardImage ? (
                  <Image style={styles.cardImage} source={{ uri: cardImage }} />
                ) : (
                  <>
                    <Image
                      style={styles.image}
                      source={require("../../assets/images/Component 2.png")}
                    />
                    <Text>Добавить банковскую карту</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.textInput}>Номер карты</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="rgba(192, 192, 192, 1)"
                placeholder="0000 0000 0000 0000"
              />
            </View>
            <View style={[styles.installmentsContainer,{marginTop:0}]}>
              <View>
                <Text style={styles.textInput}>Срок действия</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="rgba(192, 192, 192, 1)"
                  placeholder="MM / YY"
                />
              </View>
              <View>
                <Text style={styles.textInput}>Защитный код</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="rgba(192, 192, 192, 1)"
                  placeholder="CVC"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
  },
  arrowIcon: {
    width: 26,
    height: 26,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  blocks: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  border: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "rgba(55, 9, 238, 1)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  image: {
    width: 24,
    height: 24,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  none: {
    display: "none",
  },
  block: {
    display: "flex",
  },
  installmentsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 40,
    marginTop: 15,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: " rgba(25, 25, 25, 1)",
  },
  cart: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(55, 9, 238, 1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  input: {
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 20,
    backgroundColor: "white",
    fontSize: 16,
    color: "rgba(25, 25, 25, 1)",
    fontWeight: "400",
  },
  textInput: {
    color: "rgba(28, 28, 28, 1)",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    alignItems: "center",
  },
});

export default Payment;
