import { getToken } from "@/components/SecureStore/SecureStore";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ProfileProps = {
  handleOpen: () => void;
  handleOpens: () => void;
  openModal: () => void;
};

interface UserProfile {
  phone: string;
}

const Profile: React.FC<ProfileProps> = ({
  handleOpen,
  handleOpens,
  openModal,
}) => {
  const [data, setData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const handleProfile = async () => {
      try {
        const token = await getToken();
        const response = await axios.get<UserProfile>(
          "https://aist.mobi/auth/user-profile",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    handleProfile();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Профиль</Text>
        <TouchableOpacity
          onPress={() => router.push("/profile/orders")}
          style={styles.block}
        >
          <Image
            style={styles.photo}
            source={require("../../assets/images/photo.png")}
          />
          <View>
            <Text style={styles.titles}>Мои заказы</Text>
            <Text style={styles.text}>{data?.phone}</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={[styles.titles, { marginTop: 30 }]}>Данные</Text>
          <TouchableOpacity
            onPress={() => router.push("/profile/addresses")}
            style={styles.blocks}
          >
            <View style={styles.blockt}>
              <Image
                style={styles.photopin}
                source={require("../../assets/images/Map_Pin.png")}
              />
              <Text style={styles.textt}>Адрес доставки</Text>
            </View>
            <Image
              style={styles.photopin}
              source={require("../../assets/images/more (1).png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/profile/payment")}
            style={styles.blocks}
          >
            <View style={styles.blockt}>
              <Image
                style={styles.photopin}
                source={require("../../assets/images/pay.png")}
              />
              <Text style={styles.textt}>Способ оплаты</Text>
            </View>
            <Image
              style={styles.photopin}
              source={require("../../assets/images/more (1).png")}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.titles, { marginTop: 30 }]}>
            Дополнительная информация
          </Text>
          <TouchableOpacity onPress={openModal} style={styles.blocks}>
            <View style={styles.blockt}>
              <Image
                style={styles.photopin}
                source={require("../../assets/images/Help (1).png")}
              />
              <Text style={styles.textt}>Связаться с нами</Text>
            </View>
            <Image
              style={styles.photopin}
              source={require("../../assets/images/more (1).png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/profile/about")}
            style={styles.blocks}
          >
            <View style={styles.blockt}>
              <Image
                style={styles.photopin}
                source={require("../../assets/images/Info.png")}
              />
              <Text style={styles.textt}>О сервисе</Text>
            </View>
            <Image
              style={styles.photopin}
              source={require("../../assets/images/more (1).png")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={[styles.titles, { marginTop: 30 }]}>Аккаунт</Text>
          <TouchableOpacity onPress={handleOpen} style={styles.blocks}>
            <View style={styles.blockt}>
              <Image
                style={styles.photopin}
                source={require("../../assets/images/logout.png")}
              />
              <Text style={styles.textt}>Выйти с аккаунта</Text>
            </View>
            <Image
              style={styles.photopin}
              source={require("../../assets/images/more (1).png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpens} style={styles.blocks}>
            <View style={styles.blockt}>
              <Image
                style={styles.photopin}
                source={require("../../assets/images/Trash_Empty.png")}
              />
              <Text style={styles.textt}>Удалить аккаунт</Text>
            </View>
            <Image
              style={styles.photopin}
              source={require("../../assets/images/more (1).png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  block: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    gap: 16,
  },
  blocks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    gap: 16,
  },
  blockt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  photo: {
    width: 64,
    height: 64,
  },
  photopin: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 40,
    textAlign: "center",
  },
  titles: {
    fontSize: 18,
    fontWeight: "600",
    color: " rgba(28, 28, 28, 1)",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: " rgba(28, 28, 28, 1)",
  },
  textt: {
    fontSize: 16,
    fontWeight: "400",
    color: " rgba(28, 28, 28, 1)",
  },
});

export default Profile;
