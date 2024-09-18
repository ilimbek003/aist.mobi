import { getToken } from "@/components/SecureStore/SecureStore";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface OrderItem {
  id: number;
  status_order: string;
  basket_id: number;
  order_id: number;
  title: string;
  count: number;
  price: number;
  preview_img: string;
}

const MyOrders: React.FC = () => {
  const [data, setData] = useState<OrderItem[]>([]);

  useEffect(() => {
    const handleOrder = async () => {
      try {
        const token = await getToken();
        const response = await axios.get<OrderItem[][]>(
          "https://aist.mobi/order/list/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const flattenedData = response.data.flat();
        setData(flattenedData);
      } catch (error) {
        console.error(error);
      }
    };
    handleOrder();
  }, []);

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
          Мои заказы
        </Text>
        <View style={styles.arrowIcon} />
      </View>
      {data.length === 0 && (
        <View style={styles.frame}>
          <Image
            style={styles.a}
            source={require("../../assets/images/frame.png")}
          />
          <Text style={styles.titles}>Ваш список заказов пока пуст</Text>
          <Text style={styles.titles_one}>
            Вы можете оформить новый заказ. Пожалуйста, отправьте заказ, который
            хотите приобрести.
          </Text>
        </View>
      )}
      <View>
        {data.map((item) => (
          <View key={item.id}>
            <View style={styles.containers}>
              <View style={styles.block_item}>
                <Image source={{ uri: item.preview_img }} style={styles.img} />
                <View style={styles.block}>
                  <Text style={styles.text}>{item.title}</Text>
                  <Text style={styles.count}>{item.count} шт</Text>
                  <View style={styles.priceBlock}>
                    <Text style={styles.price}>{item.price} с</Text>
                    <View style={styles.status}>
                      <Image
                        style={styles.clock}
                        source={require("../../assets/images/Clock.png")}
                      />
                      <Text>{item.status_order}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => router.push(`basket/details/${item.id}`)}
                style={styles.button}
              >
                <Text style={styles.text_details}>Посмотреть детали</Text>
                <Image
                  style={styles.mo}
                  source={require("../../assets/images/mo.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  block_item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
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
  containers: {
    backgroundColor: "var(--, rgba(255, 255, 255, 1))",
    padding: 10,
    borderRadius: 14,
    gap: 10,
    marginTop: 20,
  },
  img: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: " var(--, rgba(25, 25, 25, 1))",
    marginBottom: 5,
  },
  block: {
    flex: 1,
  },
  count: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(160, 160, 160, 1)",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "var(--, rgba(25, 25, 25, 1))",
  },
  clock: {
    width: 16,
    height: 16,
  },
  status: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(231, 206, 119, 0.15)",
    gap: 5,
  },
  priceBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "rgba(55, 9, 238, 1)",
    borderRadius: 50,
    padding: 10,
  },
  mo: {
    width: 24,
    height: 24,
  },
  text_details: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(55, 9, 238, 1)",
  },
  frame: {
    alignItems: "center",
    justifyContent: "center",
  },
  a: {
    width: "70%",
    height: "55%",
  },
  titles: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 20,
    textAlign: "center",
  },
  title_text: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  titles_one: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
});

export default MyOrders;
