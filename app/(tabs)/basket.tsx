import BasketShop from "@/components/pages/ShopBasket";
import { Image, StyleSheet, View, Text } from "react-native";

export default function BasketScreen() {
  return (
    <View style={styles.container}>
      <BasketShop />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
