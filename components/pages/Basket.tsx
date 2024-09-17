import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getToken } from "../SecureStore/SecureStore";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchCart } from "../redux/get/getRequest";
import { setItemQuantities, updateItemQuantity } from "../redux/cart/cartSlice";

const Basket: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.shoppingCart);

  const [itemQuantities, setItemQuantitiesLocal] = useState<
    Record<number, number>
  >({});

  useEffect(() => {
    const initialQuantities: Record<number, number> = {};
    cart.items.forEach((item) => {
      initialQuantities[item.id] = item.quantity ?? 1;
    });
    setItemQuantitiesLocal(initialQuantities);
    dispatch(setItemQuantities(initialQuantities));
  }, [cart.items, dispatch]);

  const handleQuantityChange = (id: number, change: number) => {
    setItemQuantitiesLocal((prev) => {
      const newQuantity = (prev[id] || 1) + change;
      if (newQuantity <= 0) return prev;
      dispatch(updateItemQuantity({ id, quantity: newQuantity }));
      const updatedQuantities = { ...prev, [id]: newQuantity };
      dispatch(setItemQuantities(updatedQuantities));
      return updatedQuantities;
    });
  };

  const handleDelete = async (id: number) => {
    try {
      const token = await getToken();
      if (!token) {
        router.push("/auth/login");
        return;
      }
      await axios.delete(`https://aist.mobi/shop/cart/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(fetchCart());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.containers}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scroll}>
          {cart.items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.container}
              onPress={() => handleDelete(item.id)}
            >
              <Image source={{ uri: item.preview_img }} style={styles.img} />
              <View style={styles.block}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.count}>
                  {itemQuantities[item.id] || 1} шт
                </Text>
                <View style={styles.priceBlock}>
                  <Text style={styles.price}>{item.price} с</Text>
                  <View style={styles.flex}>
                    <TouchableOpacity
                      style={styles.minus}
                      onPress={() => handleQuantityChange(item.id, -1)}
                    >
                      <Image
                        style={styles.minus_img}
                        source={require("../../assets/images/minus.png")}
                      />
                    </TouchableOpacity>
                    <Text style={styles.text}>
                      {itemQuantities[item.id] || 1}
                    </Text>
                    <TouchableOpacity
                      style={styles.minus}
                      onPress={() => handleQuantityChange(item.id, 1)}
                    >
                      <Image
                        style={styles.minus_img}
                        source={require("../../assets/images/plus.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/basket/order")}
        >
          <Text
            style={[styles.text, { color: "var(--, rgba(255, 255, 255, 1))" }]}
          >
            Перейти к оформлению
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containers: {
    flex: 1,
  },
  container: {
    backgroundColor: "var(--, rgba(255, 255, 255, 1))",
    padding: 10,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  scroll: {
    marginBottom: 20,
    paddingHorizontal: 20,
    flex: 1,
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
  minus_img: {
    width: 26,
    height: 26,
  },
  minus: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(243, 245, 247, 1)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  block: {
    flex: 1,
  },
  priceBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
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

export default Basket;
