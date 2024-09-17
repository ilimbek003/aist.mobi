import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";

interface ModalProps {
  bottomSheetRef: React.RefObject<BottomSheetModal>;
  setPrise: (price: string) => void;
  fetchCatalogData: () => void;
}

const SortingModal: React.FC<ModalProps> = ({
  bottomSheetRef,
  fetchCatalogData,
  setPrise,
}) => {
  const [activeSort, setActiveSort] = useState<string>("priceAsc");
  const snapPoints = useMemo(() => ["40%", "40%"], []);
  const handleClose = () => bottomSheetRef.current?.close();

  useEffect(() => {
    setPrise("-price");
  }, []);

  const handleSortByPriceAsc = () => {
    setPrise("-price");
    setActiveSort("priceAsc");
    fetchCatalogData();
    handleClose();
  };

  const handleSortByPriceDesc = () => {
    setPrise("price");
    setActiveSort("priceDesc");
    fetchCatalogData();
    handleClose();
  };

  const handleSortByNameAsc = () => {
    setPrise("-title");
    setActiveSort("nameAsc");
    fetchCatalogData();
    handleClose();
  };

  const handleSortByNameDesc = () => {
    setPrise("title");
    setActiveSort("nameDesc");
    fetchCatalogData();
    handleClose();
  };

  const Backdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  return (
    <BottomSheetModal
      index={0}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={Backdrop}
    >
      <View style={styles.contentContainer}>
        <View style={styles.flexarrow}>
          <Pressable onPress={handleClose}>
            <Image
              source={require("../../assets/images/крестик.png")}
              style={styles.logo}
            />
          </Pressable>
        </View>
        <Text style={styles.title}>Сортировка</Text>
        <View>
          <TouchableOpacity
            onPress={handleSortByPriceAsc}
            style={styles.container}
          >
            <View
              style={[
                styles.border,
                activeSort === "priceAsc" && styles.activeBorder,
              ]}
            >
              {activeSort === "priceAsc" && (
                <View style={styles.borders}></View>
              )}
            </View>
            <Text style={styles.tetx}>Цена (по возрастанию)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSortByPriceDesc}
            style={styles.container}
          >
            <View
              style={[
                styles.border,
                activeSort === "priceDesc" && styles.activeBorder,
              ]}
            >
              {activeSort === "priceDesc" && (
                <View style={styles.borders}></View>
              )}
            </View>
            <Text style={styles.tetx}>Цена (по убыванию)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSortByNameAsc}
            style={styles.container}
          >
            <View
              style={[
                styles.border,
                activeSort === "nameAsc" && styles.activeBorder,
              ]}
            >
              {activeSort === "nameAsc" && <View style={styles.borders}></View>}
            </View>
            <Text style={styles.tetx}>Название (А-Я)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSortByNameDesc}
            style={styles.container}
          >
            <View
              style={[
                styles.border,
                activeSort === "nameDesc" && styles.activeBorder,
              ]}
            >
              {activeSort === "nameDesc" && (
                <View style={styles.borders}></View>
              )}
            </View>
            <Text style={styles.tetx}>Название (Я-А)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  flexarrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: 26,
    height: 26,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "rgba(25, 25, 25, 1)",
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 30,
  },
  border: {
    width: 18,
    height: 18,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: "rgba(55, 9, 238, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  activeBorder: {
    borderColor: "rgba(55, 9, 238, 1)",
  },
  borders: {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: "rgba(55, 9, 238, 1)",
  },
  tetx: {
    fontSize: 18,
    fontWeight: "500",
    color: "rgba(25, 25, 25, 1)",
  },
});

export default SortingModal;
