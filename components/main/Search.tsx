import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

interface SearchProps {
  searchInput: string;
  setSearchInput: (text: string) => void;
}

const Search: React.FC<SearchProps> = ({ setSearchInput, searchInput }) => {
  return (
    <View style={style.container}>
      <TextInput
        placeholder="Поиск товаров"
        style={style.input}
        value={searchInput}
        onChangeText={setSearchInput}
      />
      <Image
        style={style.search}
        source={require("../../assets/images/Search.png")}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: 20,
  },
  input: {
    height: 45,
    borderWidth: 0,
    paddingVertical: 10,
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
    top: 10,
  },
});

export default Search;
