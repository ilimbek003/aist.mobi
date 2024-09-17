import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Pressable,
} from "react-native";
import axios from "axios";
import { router } from "expo-router";
import { getToken } from "../SecureStore/SecureStore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { fetchCart } from "../redux/get/getRequest";

const API_URL = "https://aist.mobi/shop/gadget/filter/";

const CART_API_URL = "https://aist.mobi/shop/cart/";

interface CatalogItem {
  id: number;
  name: string;
  img: string;
  preview_img: string;
  installment_price: string;
  title: string;
  price: number;
  popular: boolean;
  color_gadgets: { id: number; color: string }[];
  ram_gadgets: { id: number; ram: string; price: number }[];
}

interface SearchProps {
  searchInput: string;
}

const SalesHits: React.FC<SearchProps> = ({ searchInput }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<CatalogItem[]>([]);

  const filteredData = data.filter((item) =>
    (item.title || "").toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    const fetchCatalogData = async () => {
      try {
        const response = await axios.get<CatalogItem[]>(API_URL);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCatalogData();
  }, []);

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

  const renderItem = ({ item }: { item: CatalogItem }) => {
    if (!item.popular) {
      return null;
    }
    return (
      <View style={styles.item}>
        <Pressable onPress={() => router.push(`/details/${item.id}`)}>
          <Image source={{ uri: item.preview_img }} style={styles.img} />
          <View style={styles.block}>
            <Image
              source={require("../../assets/images/logo.png")}
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
              source={require("../../assets/images/nav.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Хиты продаж</Text>
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
    marginTop: 20,
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
    cursor: "pointer",
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

export default SalesHits;
