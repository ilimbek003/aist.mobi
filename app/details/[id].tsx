import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Images from "./Images";
import { getToken } from "@/components/SecureStore/SecureStore";
import axios from "axios";
import { fetchCart } from "@/components/redux/get/getRequest";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/components/redux/store";
import { TouchableOpacity } from "react-native-gesture-handler";

const api = "https://aist.mobi";

interface CatalogItem {
  id: number;
  name: string;
  preview_img: string;
  installment_price: string;
  brand: string;
  price: number;
  popular: boolean;
  title: string;
  description: string;
  characteristic: {
    id: number;
    name: string;
    value: string;
  }[];
  img: {
    id: number;
    img: string;
  }[];
  color_gadgets: {
    id: number;
    color: string;
    color_images: {
      id: number;
      img: string;
    }[];
  }[];
  ram_gadgets: {
    id: number;
    ram: string;
    price: number;
  }[];
}
const DetailsShop = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<CatalogItem[]>([]);
  const [colorID, setColorID] = useState<number | null>(null);
  const [colorIDRam, setColorIDRam] = useState<number | null>(null);
  const [gadgets, setGadgets] = useState<number | null>(null);
  const [color_basket, setColor_basket] = useState<number | null>(null);
  const [ram_basket, setRam_basket] = useState<number | null>(null);

  const fetchColorID = (id: number) => {
    setColorID(id);
  };
  const fetchColorIDRam = (id: number) => {
    setColorIDRam(id);
  };

  useEffect(() => {
    setGadgets(Number(id));
    setColor_basket(colorID);
    setRam_basket(colorIDRam);
  });

  useEffect(() => {
    fetchCatalogData();
  }, []);

  const fetchCatalogData = async () => {
    try {
      const response = await fetch(
        api + `/shop/gadget/filter/?gadget_id=${id}`
      );
      const data = await response.json();
      setData(data);
      if (data.length > 0 && data[0].color_gadgets.length > 0) {
        const firstColorImages = data[0].color_gadgets[0].color_images;
        if (firstColorImages.length > 0) {
          setColorID(firstColorImages[0].id);
        }
      }
      if (data[0].ram_gadgets.length > 0) {
        setColorIDRam(data[0].ram_gadgets[0].id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToCart = async () => {
    try {
      const token = await getToken();
      if (!token) {
        router.push("/auth/login");
        return;
      }
      dispatch(fetchCart());
      const postData: {
        gadgets: number | null;
        color_basket: number | null;
        ram_basket?: number | null;
      } = {
        gadgets,
        color_basket,
      };
      if (colorIDRam !== null) {
        postData.ram_basket = colorIDRam;
      }
      const response = await axios.post(api + "/shop/cart/", postData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.data.𝘳𝘦𝘴𝘱𝘰𝘯𝘴𝘦 === true) {
        Alert.alert(response.data.𝘮𝘦𝘴𝘴𝘢𝘨𝘦);
        router.push("/basket");
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

  return (
    <View>
      <View style={styles.backButton}>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../assets/images/arrow.png")}
            style={styles.arrowIcon}
          />
        </Pressable>
        <Images data={data} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scroll}>
          <View style={styles.container}>
            {data.map((item) => (
              <View key={item.id}>
                <Text style={styles.text}>{item.title}</Text>
                <View>
                  <View style={styles.block_flex}>
                    {item.color_gadgets.map((colorItem) => (
                      <View key={colorItem.id}>
                        {colorItem.color_images.some(
                          (img) => img.id === colorID
                        ) && (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginTop: 30,
                            }}
                          >
                            <Text style={styles.color}>Цвет:</Text>

                            <Text style={styles.color_text}>
                              {colorItem.color}
                            </Text>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <View style={styles.block_flex}>
                      {item.color_gadgets.map((colorItem) => (
                        <View key={colorItem.id}>
                          <View style={styles.flex}>
                            {colorItem.color_images.map((colorImage) => (
                              <Pressable
                                key={colorImage.id}
                                onPress={() => fetchColorID(colorImage.id)}
                              >
                                <View
                                  style={[
                                    styles.flex_img,
                                    colorID === colorImage.id && {
                                      borderWidth: 1.5,
                                      borderColor: "rgba(55, 9, 238, 1)",
                                    },
                                  ]}
                                >
                                  <Image
                                    style={styles.img}
                                    source={{ uri: colorImage.img }}
                                  />
                                </View>
                              </Pressable>
                            ))}
                          </View>
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.container}>
            {data.map((item) => (
              <View key={item.id}>
                <View>
                  <View style={styles.block_flex}>
                    {item.ram_gadgets.map((colorItem) => (
                      <View key={colorItem.id}>
                        {colorItem.id === colorIDRam && (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginTop: 30,
                            }}
                          >
                            <Text style={styles.color}>Память:</Text>
                            <Text style={styles.color_text}>
                              {colorItem.ram}
                            </Text>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <View style={styles.block_flex}>
                      {item.ram_gadgets.map((colorItem) => (
                        <View key={colorItem.id}>
                          <View style={styles.flex}>
                            <Pressable
                              key={colorItem.id}
                              onPress={() => fetchColorIDRam(colorItem.id)}
                            >
                              <View
                                style={[
                                  styles.flex_ram,
                                  colorIDRam === colorItem.id && {
                                    borderWidth: 1.5,
                                    borderColor: "rgba(55, 9, 238, 1)",
                                    backgroundColor: "rgba(55, 9, 238, 0.1)",
                                  },
                                ]}
                              >
                                <Text style={styles.color_ram}>
                                  {colorItem.ram}
                                </Text>
                              </View>
                            </Pressable>
                          </View>
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.container}>
            {data.map((item) => (
              <View key={item.id}>
                <Text style={[styles.text, { marginTop: 20 }]}>Описание</Text>
                <Text style={[styles.text_description, { marginTop: 10 }]}>
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.container}>
            {data.map((item) => (
              <View key={item.id}>
                <Text style={[styles.text, { marginTop: 20 }]}>
                  Характеристики
                </Text>
                <View style={{ flex: 1 }}>
                  {item.characteristic.map((characteristic) => (
                    <View
                      key={characteristic.id}
                      style={styles.flex_characteristic}
                    >
                      <Text style={[styles.color, { marginTop: 10 }]}>
                        {characteristic.name}:
                      </Text>
                      <Text style={[styles.text_name, { marginTop: 10 }]}>
                        {characteristic.value}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
            <TouchableOpacity onPress={addToCart} style={styles.button}>
              <Image
                style={styles.icon}
                source={require("../../assets/images/nav.png")}
              />
              <Text style={styles.text_btn}>Добавить в корзину</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  scroll: {
    marginBottom: "100%",
  },
  backButton: {
    marginTop: 40,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  arrowIcon: {
    width: 26,
    height: 26,
    marginLeft: 20,
    marginTop: 20,
  },
  text: {
    color: "rgba(25, 25, 25, 1)",
    fontWeight: "600",
    fontSize: 18,
    marginTop: 10,
  },
  color: {
    color: "rgba(160, 160, 160, 1)",
    fontSize: 14,
    fontWeight: "400",
  },
  color_text: {
    color: "rgba(28, 28, 28, 1)",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  flex: {
    flexDirection: "row",
  },
  block_flex: {
    flexDirection: "row",
  },
  flex_img: {
    marginTop: 10,
    width: 65,
    height: 65,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 10,
    marginRight: 10,
  },
  img: {
    width: 50,
    height: 50,
  },
  flex_ram: {
    width: 76,
    height: 40,
    backgroundColor: "rgba(234, 234, 234, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginRight: 10,
    marginTop: 10,
  },
  color_ram: {
    color: "rgba(28, 28, 28, 1)",
    fontSize: 14,
    fontWeight: "400",
  },
  text_description: {
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(83, 83, 83, 1)",
  },
  text_name: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(28, 28, 28, 1)",
    flex: 1,
    width: "60%",
    alignContent: "flex-end",
    justifyContent: "flex-end",
    textAlign: "right",
  },
  flex_characteristic: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  icon: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(55, 9, 238, 1)",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  text_btn: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default DetailsShop;
