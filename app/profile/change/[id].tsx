import { getToken } from "@/components/SecureStore/SecureStore";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput } from "react-native-gesture-handler";

const data = [
  { label: "Бишкек", value: "1" },
  { label: "Талас", value: "2" },
  { label: "Нарын", value: "3" },
  { label: "Ыссык-кол", value: "4" },
  { label: "Ош", value: "5" },
  { label: "Баткен", value: "6" },
  { label: "Жалал-абад", value: "7" },
  { label: "Токтогул", value: "8" },
  { label: "Чуй", value: "9" },
  { label: "Кочкор", value: "10" },
];

type DataItem = {
  id: string;
  address: string;
  apparment: string;
};

const ChangeAddress = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [value, setValue] = useState(data[0].label);
  const [isFocus, setIsFocus] = useState(false);
  const [address, setAddress] = useState("");
  const [apparment, setApartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [datas, setDatas] = useState<DataItem[]>([]);

  useEffect(() => {
    datas.map((data) => {
      if (data.id == id) {
        setAddress(data.address || "");
        setApartment(data.apparment || "");
      }
    });
  }, [datas, id]);

  useEffect(() => {
    handlePress();
  }, []);

  const handlePress = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        "https://aist.mobi/order/address/list/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setDatas(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteAddress = async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Ошибка", "Не удалось получить токен.");
        return;
      }
      const response = await axios.delete(
        `https://aist.mobi/order/address/${id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.data.response === true) {
        router.push("/profile/addresses");
        handlePress();
      } else {
        Alert.alert("Успешно", "Адрес успешно удален!");
        router.push("/profile/addresses");
        handlePress();
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      Alert.alert("Ошибка", "Произошла ошибка при удалении адреса.");
    }
  };

  const handleSubmit = async () => {
    if (!address || !apparment) {
      Alert.alert("Ошибка", "Пожалуйста, заполните все поля.");
      return;
    }
    setIsLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Ошибка", "Не удалось получить токен.");
        return;
      }
      const response = await axios.put(
        `https://aist.mobi/order/address/${id}/`,
        {
          region: value,
          address: address,
          apparment: apparment,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.data.response === true) {
        Alert.alert("Успех", "Адрес успешно обновлен!");
        handlePress();
        router.push("/profile/addresses");
      } else {
        Alert.alert("Успех", "Адрес успешно обновлен!");
        router.push("/profile/addresses");
        handlePress();
      }
    } catch (error) {
      console.error("Error updating address:", error);
      Alert.alert("Ошибка", "Произошла ошибка при обновлении адреса.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <Pressable onPress={() => router.push("/profile/addresses")}>
          <Image
            source={require("../../../assets/images/arrow.png")}
            style={styles.arrowIcon}
          />
        </Pressable>
        <Text numberOfLines={1} style={styles.title}>
          Изменить адрес
        </Text>
        <TouchableOpacity onPress={deleteAddress}>
          <Image
            source={require("../../../assets/images/del.png")}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.blocks}>
        <View>
          <Text style={styles.text}>Регион</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? data[0].label : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.label);
              setIsFocus(false);
            }}
          />
        </View>
        <View>
          <Text style={styles.text}>Адрес</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите адрес"
            placeholderTextColor="rgba(192, 192, 192, 1)"
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <View>
          <Text style={styles.text}>Подъезд, квартира, этаж и др.</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите дополнительные данные"
            placeholderTextColor="rgba(192, 192, 192, 1)"
            value={apparment}
            onChangeText={setApartment}
          />
        </View>
        <View style={styles.blocks}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.texts}>Сохранить</Text>
            )}
          </TouchableOpacity>
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
  blocks: {
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
  map: {
    width: 100,
    height: 100,
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
    position: "absolute",
    bottom: 20,
  },
  icon: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  texts: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 14,
    fontWeight: "500",
  },
  dropdown: {
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 26,
    height: 26,
  },
  inputSearchStyle: {
    height: 40,
    borderRadius: 50,
    fontSize: 16,
  },
  text: {
    color: "rgba(28, 28, 28, 1)",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    marginTop: 20,
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
});

export default ChangeAddress;
