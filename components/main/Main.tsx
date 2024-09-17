import React, { useEffect, useState, useCallback } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  RefreshControl,
} from "react-native";
import Search from "./Search";
import Banner from "./Banner";
import Catalog from "./Catalog";
import SalesHits from "./SalesHits";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchCart } from "../redux/get/getRequest";
import { router } from "expo-router";
import { getToken } from "../SecureStore/SecureStore";

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchInput, setSearchInput] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchCart());
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleHelpPress = async () => {
    try {
      const token = await getToken();
      if (!token) {
        router.push("/auth/login");
      } else {
        router.push({
          pathname: "/profile",
          params: { openContactModal: true },
        });
      }
    } catch (error) {}
  };

  return (
    <View>
      <View style={style.container}>
        <View style={style.flex}>
          <View style={style.help} />
          <Image
            style={style.logo}
            source={require("../../assets/images/aist.png")}
          />
          <Pressable onPress={handleHelpPress}>
            <Image
              style={style.help}
              source={require("../../assets/images/Help.png")}
            />
          </Pressable>
        </View>
        <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={style.scroll}>
          <Banner />
          <View style={style.container}>
            <Catalog searchInput={searchInput} />
            <SalesHits searchInput={searchInput} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  scroll: {
    marginBottom: 270,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
  },
  logo: {
    width: 94,
    height: 16,
  },
  help: {
    width: 24,
    height: 24,
  },
});

export default Main;
