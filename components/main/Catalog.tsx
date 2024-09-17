import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
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
interface SearchProps {
  searchInput: string;
}
const Catalog: React.FC<SearchProps> = ({ searchInput }) => {
  const [data, setData] = useState<CatalogItem[]>([]);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
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

  const renderItem = ({ item }: { item: CatalogItem }) => (
    <Pressable onPress={() => router.push(`/details/other/${item.id}`)}>
      <View style={styles.item}>
        <Image source={{ uri: item.img }} style={styles.img} />
        <Text numberOfLines={1} style={styles.itemText}>
          {item.name}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Text style={styles.text}>Каталог</Text>
        <Pressable
          style={styles.flex_all}
          onPress={() => router.push("/catalog")}
        >
          <Text style={styles.all}>Все</Text>
          <Image
            style={styles.more}
            source={require("../../assets/images/more.png")}
          />
        </Pressable>
      </View>
      <FlatList
        data={filteredData.slice(0, 8)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={4}
        columnWrapperStyle={styles.list}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flex_all: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  text: {
    color: "rgba(25, 25, 25, 1)",
    fontWeight: "600",
    fontSize: 18,
  },
  all: {
    color: "rgba(55, 9, 238, 1)",
    fontWeight: "400",
    fontSize: 16,
  },
  list: {
    justifyContent: "space-between",
    marginTop: 10,
  },
  item: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
    padding: 10,
    cursor: "pointer",
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
  more: {
    width: 24,
    height: 24,
  },
});

export default Catalog;
