import { setSelectedAddress } from "@/components/redux/cart/addressesSlice";
import { getToken } from "@/components/SecureStore/SecureStore";
import axios from "axios";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

interface addressOreder {
  id: number;
  address: string;
}

const Addresses = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState<addressOreder[]>([]);
  const [active, setActive] = useState<number | null>(null);

  const handleActive = (id: number, address: string) => {
    setActive(id);
    router.push("/basket/order");
    dispatch(setSelectedAddress({ id, address }));
  };

  useEffect(() => {
    handlePress();
  }, []);

  const handlePress = async () => {
    try {
      const token = await getToken();
      const response = await axios.get<addressOreder[]>(
        "https://aist.mobi/order/address/list/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = response.data;
      setActive(data[0].id);
      setAddress(data);
      dispatch(
        setSelectedAddress({ id: data[0].id, address: data[0].address })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
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
          Адреса
        </Text>
        <View style={styles.arrowIcon} />
      </View>
      <View style={styles.blocks}>
        {address.length === 0 && (
          <View style={styles.block}>
            <Image
              style={styles.map}
              source={require("../../assets/images/map.png")}
            />
            <Text style={styles.text}>Нет</Text>
            <Text style={styles.text}>сохраненных адресов</Text>
          </View>
        )}
        <View style={{ marginTop: 20 }}>
          {address.map((item) => (
            <View style={styles.order} key={item.id}>
              <View style={styles.flex}>
                <TouchableOpacity
                  style={styles.lineor}
                  onPress={() => handleActive(item.id, item.address)}
                >
                  {active === item.id ? (
                    <View style={styles.line}></View>
                  ) : null}
                </TouchableOpacity>
                <Text>{item.address}</Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push(`/profile/change/${item.id}`)}
              >
                <Image
                  style={styles.icon}
                  source={require("../../assets/images/or.png")}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.blocks}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/profile/newaddress")}
          >
            <Image
              style={styles.icon}
              source={require("../../assets/images/Com.png")}
            />
            <Text style={styles.texts}>Добавить адрес</Text>
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
  block: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  map: {
    width: 100,
    height: 100,
  },
  text: {
    color: "rgba(28, 28, 28, 1)",
    fontSize: 24,
    fontWeight: "600",
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
  order: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  lineor: {
    width: 24,
    height: 24,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(55, 9, 238, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    width: 16,
    height: 16,
    borderRadius: 50,
    backgroundColor: "rgba(55, 9, 238, 1)",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default Addresses;
