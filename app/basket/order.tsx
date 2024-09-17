import { AppDispatch, RootState } from "@/components/redux/store";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Payment from "./payment";
import Recipient from "./recipient";
import axios from "axios";
import { getToken } from "@/components/SecureStore/SecureStore";
import { fetchCart } from "@/components/redux/get/getRequest";

const OrderPlacement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.shoppingCart.items);
  const cart = useSelector((state: RootState) => state.shoppingCart);
  const [checked, setChecked] = useState<boolean>(false);
  const [checkedmap, setCheckedmap] = useState<boolean>(false);
  const [activeInstallment, setActiveInstallment] = useState<number>(0);
  const [cash, setCash] = useState<boolean>(false);
  const selectedAddressId = useSelector(
    (state: RootState) => state.selectedAddress.selectedAddress
  );
  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");

  const handleOrderSubmit = async () => {
    const orderData: any = {
      basket: cartItems.map((item) => ({
        id: item.id,
        count: item.quantity,
      })),
      first_name: "string",
      last_name: "string",
      address: 12,
    };
    if (checkedmap) {
      orderData.by_bank_card = true;
    }
    if (checked) {
      orderData.installment = activeInstallment;
    }
    if (cash) {
      orderData.in_cash = true;
    }
    try {
      const token = await getToken();
      const response = await axios.post(
        "https://aist.mobi/order/create/",
        orderData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      Alert.alert("Успех", "Заказ успешно создан");
      router.push("/profile/orders");
      dispatch(fetchCart());
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось создать заказ");
      console.error("Error creating order:", error);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Оформление заказа</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scroll}>
            <View>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.containers}>
                  <Image
                    source={{ uri: item.preview_img }}
                    style={styles.img}
                  />
                  <View style={styles.block}>
                    <Text style={styles.text}>{item.title}</Text>
                    <Text style={styles.count}>{item.quantity} шт</Text>
                    <Text style={styles.price}>{item.price} с</Text>
                  </View>
                </View>
              ))}
            </View>
            <View>
              <Text style={styles.total}>Способ доставки</Text>
              <TouchableOpacity
                onPress={() => router.push("/profile/addresses")}
                style={styles.blocks}
              >
                <View style={styles.blockt}>
                  <Image
                    style={styles.photopin}
                    source={require("../../assets/images/Map_Pin.png")}
                  />
                  {selectedAddressId ? (
                    <Text style={styles.texts}>{selectedAddressId}</Text>
                  ) : (
                    <Text style={styles.textt}>Введите адрес доставки</Text>
                  )}
                </View>
                <Image
                  style={styles.photopin}
                  source={require("../../assets/images/more (1).png")}
                />
              </TouchableOpacity>
            </View>
            <Payment
              setActiveInstallment={setActiveInstallment}
              activeInstallment={activeInstallment}
              setChecked={setChecked}
              checked={checked}
              checkedmap={checkedmap}
              setCheckedmap={setCheckedmap}
              cash={cash}
              setCash={setCash}
            />
            <Recipient
              setFirstName={setFirstName}
              setLastName={setLastName}
              lastName={lastName}
              firstName={firstName}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.footer_block}>
          <Text style={styles.count}>Количество:</Text>
          <Text style={[styles.price, { fontWeight: "500" }]}>
            {cart.totalCount} шт
          </Text>
        </View>
        <View style={styles.footer_block}>
          <Text style={styles.count}>Сумма:</Text>
          <Text style={[styles.price, { fontWeight: "500" }]}>
            {cart.totalPrice} с
          </Text>
        </View>
        <View style={styles.footer_block}>
          <Text style={styles.count}>Доставка:</Text>
          <Text style={[styles.price, { fontWeight: "500" }]}>Бесплатная</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleOrderSubmit}>
          <Text
            style={[styles.text, { color: "var(--, rgba(255, 255, 255, 1))" }]}
          >
            Оплатить
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderPlacement;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  scroll: {
    marginBottom: 10,
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  containers: {
    backgroundColor: "var(--, rgba(255, 255, 255, 1))",
    padding: 10,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 40,
    textAlign: "center",
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
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "var(--, rgba(25, 25, 25, 1))",
  },
  blocks: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
  },
  photopin: {
    width: 26,
    height: 26,
  },
  blockt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textt: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(160, 160, 160, 1)",
  },
  texts: {
    fontSize: 16,
    fontWeight: "400",
    color: " var(--, rgba(25, 25, 25, 1))",
  },
  total: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "var(--, rgba(255, 255, 255, 1))",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  footer_block: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(55, 9, 238, 1)",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
