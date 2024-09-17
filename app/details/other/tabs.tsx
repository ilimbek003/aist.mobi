import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface CatalogItem {
  id: number;
  brand: string;
}

interface TabsProps {
  data: CatalogItem[];
  activeTab: string | null;
  setActiveTab: (brand: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ data, activeTab, setActiveTab }) => {
  const uniqueBrands = Array.from(new Set(data.map((item) => item.brand)));

  return (
    <View style={styles.container}>
      {uniqueBrands.length > 0
        ? uniqueBrands.map((brand) => (
            <Pressable key={brand} onPress={() => setActiveTab(brand)}>
              <View
                style={[styles.item, activeTab === brand && styles.activeItem]}
              >
                <Text
                  style={[
                    styles.text,
                    activeTab === brand && styles.activeText,
                  ]}
                >
                  {brand}
                </Text>
              </View>
            </Pressable>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 89,
    backgroundColor: "rgba(234, 234, 234, 1)",
    paddingVertical: 8,
    borderRadius: 50,
    marginTop: 20,
    marginRight: 10,
  },
  activeItem: {
    backgroundColor: "rgba(55, 9, 238, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(55, 9, 238, 1)",
  },
  text: {
    color: "rgba(25, 25, 25, 1)",
    fontWeight: "400",
    fontSize: 14,
  },
  activeText: {
    color: "rgba(55, 9, 238, 1)",
    fontWeight: "400",
    fontSize: 14,
  },
});

export default Tabs;
