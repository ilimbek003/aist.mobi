import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/components/redux/store";
import { getToken } from "@/components/SecureStore/SecureStore";
import { fetchCart } from "@/components/redux/get/getRequest";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CatalogItem {
  id: number;
  title: string;
  preview_img: string;
  installment_price: string;
  price: number;
  popular: boolean;
  color_gadgets: { id: number; color: string }[];
  ram_gadgets: { id: number; ram: string; price: number }[];
}

interface ProductsProps {
  data: CatalogItem[];
  loading: boolean;
}

const CART_API_URL = "https://aist.mobi/shop/cart/";

const Products: React.FC<ProductsProps> = ({ data, loading }) => {
  const dispatch = useDispatch<AppDispatch>();

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const addToCart = async ({
    gadgets,
    color_basket,
    ram_basket,
  }: {
    gadgets: number;
    color_basket: number | undefined;
    ram_basket: number | undefined;
  }) => {
    try {
      const token = await getToken();
      if (!token) {
        router.push("/auth/login");
        return;
      }
      dispatch(fetchCart());
      const response = await axios.post(
        CART_API_URL,
        {
          gadgets,
          color_basket,
          ram_basket,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.data.𝘳𝘦𝘴𝘱𝘰𝘯𝘴𝘦 === true) {
        Alert.alert(response.data.𝘮𝘦𝘴𝘴𝘢𝘨𝘦);
      } else {
        Alert.alert(response.data.𝘮𝘦𝘴𝘴𝘢𝘨𝘦);
      }
    } catch (error) {
      Alert.alert(
        "Ошибка",
        "Произошла ошибка при добавлении товара в корзину."
      );
    }
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }: { item: CatalogItem }) => (
    <View style={styles.item}>
      <View>
        <Pressable onPress={() => router.push(`/details/${item.id}`)}>
          <Image source={{ uri: item.preview_img }} style={styles.img} />
          <View style={styles.block}>
            <Image
              source={require("../../../assets/images/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.ot}>от</Text>
            <Text style={styles.price}>{item.installment_price}</Text>
            <Text style={styles.price}>с/мес</Text>
          </View>
          <Text style={styles.itemText} numberOfLines={2} ellipsizeMode="tail">
            {item.title}
          </Text>
        </Pressable>
        <View style={styles.priceBlock}>
          <Text style={styles.itemPrice}>{item.price} с</Text>
          <TouchableOpacity
            onPress={() => {
              addToCart({
                gadgets: item.id,
                color_basket: item.color_gadgets[0]?.id,
                ram_basket: item.ram_gadgets[0]?.id,
              });
            }}
            style={styles.cart}
          >
            <Image
              style={styles.logo}
              source={require("../../../assets/images/nav.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData.filter((item) => item.popular)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "rgba(25, 25, 25, 1)",
    fontWeight: "600",
    fontSize: 18,
  },
  list: {
    justifyContent: "space-between",
  },
  item: {
    width: "48%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 8,
  },
  img: {
    width: "80%",
    height: 140,
    alignSelf: "center",
  },
  itemText: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(25, 25, 25, 1)",
    lineHeight: 18,
  },
  block: {
    width: "100%",
    backgroundColor: "rgba(231, 119, 225, 0.15)",
    borderRadius: 50,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  price: {
    marginRight: 5,
    fontWeight: "500",
    color: "rgba(25, 25, 25, 1)",
    fontSize: 12,
  },
  ot: {
    marginRight: 5,
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(107, 107, 107, 1)",
  },
  itemPrice: {
    fontWeight: "700",
    color: "rgba(25, 25, 25, 1)",
    fontSize: 16,
  },
  priceBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  logo: {
    width: 24,
    height: 24,
  },
  cart: {
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "rgba(55, 9, 238, 1)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Products;
