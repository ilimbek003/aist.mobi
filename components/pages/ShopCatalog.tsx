import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import axios from "axios";
import { router } from "expo-router";

const API_URL = "https://aist.mobi/shop/gadget/category/";

interface CatalogItem {
  id: number;
  name: string;
  img: string;
}

const ShopCatalog: React.FC = () => {
  const [data, setData] = useState<CatalogItem[]>([]);
  const [searchInput, setSearchInput] = useState("");

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

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const renderItem = ({ item }: { item: CatalogItem }) => (
    <Pressable onPress={() => router.push(`/details/other/${item.id}`)}>
      <View style={styles.item}>
        <Image source={{ uri: item.img }} style={styles.img} />
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <TextInput
          placeholder="Поиск товаров"
          style={styles.input}
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
        />
        <Image
          style={styles.search}
          source={require("../../assets/images/Search.png")}
        />
      </View>
      <FlatList
        columnWrapperStyle={styles.list}
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  flex: {
    position: "relative",
  },
  list: {
    marginTop: 10,
    justifyContent: "space-between",
  },
  item: {
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
    padding: 10,
  },
  img: {
    width: 55,
    height: 30,
  },
  itemText: {
    marginTop: 5,
    fontSize: 10,
    color: "rgba(25, 25, 25, 1)",
  },
  input: {
    height: 45,
    borderWidth: 0,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    borderRadius: 50,
    backgroundColor: "rgba(234, 234, 234, 1)",
    fontSize: 16,
    fontWeight: "400",
  },
  search: {
    position: "absolute",
    width: 24,
    height: 24,
    left: 15,
    top: 30,
  },
});

export default ShopCatalog;
