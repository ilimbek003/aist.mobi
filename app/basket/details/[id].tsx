import { RootState } from "@/components/redux/store";
import { getToken } from "@/components/SecureStore/SecureStore";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

interface BasketItem {
  id: number;
  title: string;
  count: number;
  price: number;
  preview_img: string;
  status_order: string;
  basket_id: number;
  order_id: number;
  payment_method: string;
}

interface OrderItem {
  basket_items: BasketItem[];
  order_id: number;
  address: {
    address: string;
  };
  last_name: string;
  first_name: string;
  user_phone: string;
  created_at: string;
  status_order: string;
  id: number;
}

const OrderDetails = () => {
  const id = useSelector((state: RootState) => state.setidAddress.order_id);
  const basket_id = useSelector(
    (state: RootState) => state.setidAddress.basket_id
  );
  const [data, setData] = useState<OrderItem | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      axios
        .get<OrderItem>(
          `https://aist.mobi/order/order/${id}/basket_item/${basket_id}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Ошибка при получении данных:", error);
        });
    };

    fetchToken();
  }, []);

  const handleId = async (orderId: number, basketId: number) => {
    try {
      const token = await getToken();
      const response = await axios.delete(
        `https://aist.mobi/order/${orderId}/basket_item/${basketId}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      Alert.alert("Успех", "Заказ успешно отменен");
      router.push("/profile/orders");
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось отменить заказ");
      console.error("Error deleting order:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../../assets/images/arrow.png")}
            style={styles.arrowIcon}
          />
        </Pressable>
        <Text numberOfLines={1} style={styles.title}>
          Детали заказа
        </Text>
        <View style={styles.arrowIcon} />
      </View>
      <View style={styles.blocks}>
        <View style={styles.blocks}>
          <View>
            {data &&
              data.basket_items.map((item) => (
                <View key={item.id}>
                  <View style={styles.containers}>
                    <View style={styles.block_item}>
                      <Image
                        source={{ uri: item.preview_img }}
                        style={styles.img}
                      />
                      <View style={styles.block}>
                        <Text style={styles.text}>{item.title}</Text>
                        <Text style={styles.count}>{item.count} шт</Text>
                        <View style={styles.priceBlock}>
                          <Text style={styles.price}>{item.price} с</Text>
                          <View style={styles.status}>
                            <Image
                              style={styles.clock}
                              source={require("../../../assets/images/Clock.png")}
                            />
                            <Text>{data.status_order}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
          </View>
          <View>
            <View style={styles.flex}>
              <Text style={styles.order}>Номер заказа:</Text>
              <Text style={styles.order_id}>{data?.order_id}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.order}>Адрес доставки:</Text>
              <Text style={styles.order_id}>{data?.address.address}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.order}>Способ оплаты:</Text>
              <Text style={styles.order_id}>
                {data?.basket_items[0].payment_method}
              </Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.order}>Получатель:</Text>
              <Text style={styles.order_id}>
                {data?.last_name} {data?.first_name}
              </Text>
              <Text style={styles.order_id}>{data?.user_phone}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.order}>Дата оформления заказа:</Text>
              <Text style={styles.order_id}>{data?.created_at}</Text>
            </View>
          </View>
        </View>
        <View style={styles.blocks}>
          <TouchableOpacity
            onPress={() => data && handleId(data.id, data.basket_items[0].id)}
            style={styles.button}
          >
            <Text style={styles.text_details}>Отменить заказ</Text>
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
  },
  blocks: {
    flex: 1,
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
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 10,
    borderRadius: 14,
    gap: 10,
    marginTop: 20,
  },
  img: {
    width: 100,
    height: 100,
  },
  block: {
    flex: 1,
  },
  block_item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  count: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(160, 160, 160, 1)",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(25, 25, 25, 1)",
  },
  clock: {
    width: 16,
    height: 16,
  },
  priceBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(25, 25, 25, 1)",
    marginBottom: 5,
  },
  order: {
    color: "rgba(28, 28, 28, 1)",
    fontSize: 16,
    fontWeight: "600",
  },
  order_id: {
    color: "rgba(112, 112, 112, 1)",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 2,
  },
  flex: {
    marginTop: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "rgba(232, 29, 29, 1)",
    borderRadius: 50,
    padding: 10,
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  text_details: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(232, 29, 29, 1)",
  },
});

export default OrderDetails;
