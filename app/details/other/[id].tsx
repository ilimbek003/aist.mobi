import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Tabs from "./tabs";
import Products from "./products";
import Modal from "@/app/modal/modal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetModal, {
  BottomSheetModalProvider,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import SortingModal from "@/app/modal/sortingmodal";

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
}

const api = "https://aist.mobi";

const ShopDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<CatalogItem[]>([]);
  const [tabs, setTabs] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const bottomSheetRefs = useRef<BottomSheetModal>(null);
  const [rangeValues, setRangeValues] = useState([0, 47990]);
  const [prise, setPrise] = useState<string>("");
  

  const handleOpen = useCallback(() => {
    bottomSheetRef.current?.present();
    bottomSheetRefs.current?.dismiss();
  }, []);

  const handleOpens = useCallback(() => {
    bottomSheetRef.current?.dismiss();
    bottomSheetRefs.current?.present();
  }, []);

  const handleRangeChange = (min: number, max: number) => {
    fetchCatalogData();
  };

  useEffect(() => {
    fetchCatalogData();
    fetchCatalogTabs();
  }, [activeTab, prise]);

  const fetchCatalogData = async () => {
    try {
      setLoading(true);
      const priceMin =
        rangeValues[0] !== undefined ? `&price_min=${rangeValues[0]}` : "";
      const priceMax =
        rangeValues[1] !== undefined ? `&price_max=${rangeValues[1]}` : "";

      const response = await axios.get(
        `${api}/shop/gadget/filter/?category_id=${id}&brand=${
          activeTab || ""
        }${priceMin}${priceMax}&sort_by=${prise}`
      );
      setData(response.data);
    } catch (error) {
      setError("Ошибка при получении данных.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCatalogTabs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${api}/shop/gadget/filter/?category_id=${id}`
      );
      const fetchedData = response.data;
      if (activeTab === null) {
        setActiveTab(fetchedData[0].brand);
      }
      setTabs(fetchedData);
    } catch (error) {
      setError("Ошибка при получении данных.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView style={styles.transparentBackground}>
        <View style={styles.container}>
          <View style={styles.backButton}>
            <Pressable onPress={() => router.back()}>
              <Image
                source={require("../../../assets/images/arrow.png")}
                style={styles.arrowIcon}
              />
            </Pressable>
            <Text numberOfLines={1} style={styles.title}>
              Каталог, товары
            </Text>
            <TouchableOpacity onPress={() => router.push("/details/search")}>
              <Image
                style={styles.arrowIcon}
                source={require("../../../assets/images/Search.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.filterContainer}>
            <View style={styles.flex}>
              <Image
                style={styles.arrowIcon}
                source={require("../../../assets/images/filter.png")}
              />
              <Pressable onPress={handleOpen}>
                <Text style={styles.filter}>Фильтр</Text>
              </Pressable>
            </View>
            <Pressable style={styles.flex} onPress={handleOpens}>
              <Image
                style={styles.arrowIcon}
                source={require("../../../assets/images/data.png")}
              />
              <Text style={styles.filter}>Сортировка</Text>
            </Pressable>
          </View>
          <Tabs data={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          <Products data={data} loading={loading} />
        </View>
        <SortingModal
          bottomSheetRef={bottomSheetRefs}
          setPrise={setPrise}
          fetchCatalogData={fetchCatalogData}
        />
        <Modal
          bottomSheetRef={bottomSheetRef}
          data={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setRangeValues={setRangeValues}
          rangeValues={rangeValues}
          handleRangeChange={handleRangeChange}
        />
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  transparentBackground: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    flex: 1,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  arrowIcon: {
    width: 26,
    height: 26,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(172, 172, 172, 1)",
    marginTop: 20,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    width: "50%",
    justifyContent: "center",
  },
  filter: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(25, 25, 25, 1)",
    marginLeft: 10,
  },
});

export default ShopDetails;
