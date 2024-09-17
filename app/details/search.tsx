import { setSearchTerm } from "@/components/redux/cart/searchSlice";
import { AppDispatch, RootState } from "@/components/redux/store";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  const handleSearchChange = (text: string) => {
    dispatch(setSearchTerm(text));
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={() => router.back()}>
          <Image
            source={require("../../assets/images/arrow.png")}
            style={styles.arrowIcon}
          />
        </Pressable>
      </View>
      <View style={styles.flex}>
        <TextInput
          placeholder="Поиск товаров"
          style={styles.input}
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
        <Image
          style={styles.search}
          source={require("../../assets/images/Search.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  arrowIcon: {
    width: 26,
    height: 26,
  },
  flex: {
    position: "relative",
    flex: 1,
  },
  input: {
    height: 45,
    width: "100%",
    borderWidth: 0,
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
    top: 11,
  },
});

export default Search;
