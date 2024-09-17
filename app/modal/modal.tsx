import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

interface CatalogItem {
  id: number;
  brand: string;
}

interface ModalProps {
  bottomSheetRef: React.RefObject<BottomSheetModal>;
  data: CatalogItem[];
  activeTab: string | null;
  setActiveTab: (brand: string) => void;
  rangeValues: number[];
  setRangeValues: React.Dispatch<React.SetStateAction<number[]>>;
  handleRangeChange: (min: number, max: number) => void;
}

const Modal: React.FC<ModalProps> = ({
  bottomSheetRef,
  data,
  activeTab,
  setActiveTab,
  rangeValues,
  setRangeValues,
  handleRangeChange,
}) => {
  const uniqueBrands = Array.from(new Set(data.map((item) => item.brand)));
  const [filterTab, setFilterTab] = useState<string | null>(null);
  const snapPoints = useMemo(() => ["50%", "100%"], []);
  const screenWidth = Dimensions.get("window").width;
  const handleClose = () => bottomSheetRef.current?.close();

  useEffect(() => {
    if (activeTab) {
      setFilterTab(activeTab);
    }
  }, [activeTab]);

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
      ref={bottomSheetRef}
      index={0}
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
        <Text style={styles.title}>Фильтр</Text>
        <View>
          <Text style={styles.tetx}>Бренд</Text>
          <View style={styles.container}>
            {uniqueBrands.length > 0 ? (
              uniqueBrands.map((brand) => (
                <Pressable key={brand} onPress={() => setFilterTab(brand)}>
                  <View
                    style={[
                      styles.item,
                      filterTab == brand && styles.activeItem,
                    ]}
                  >
                    <Text
                      style={[
                        styles.text,
                        filterTab == brand && styles.activeText,
                      ]}
                    >
                      {brand}
                    </Text>
                  </View>
                </Pressable>
              ))
            ) : (
              <Text>Нет доступных брендов</Text>
            )}
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.tetx}>Цена</Text>
          <View style={styles.slider}>
            <MultiSlider
              values={rangeValues}
              sliderLength={screenWidth - 60} 
              onValuesChange={(values) => {
                const [minValue, maxValue] = values;
                const clampedMin = Math.max(0, minValue);
                const clampedMax = Math.min(47990, maxValue);
                setRangeValues([clampedMin, clampedMax]);
              }}
              min={0}
              max={47990}
              step={1}
              allowOverlap={false}
              snapped
              selectedStyle={{ backgroundColor: "rgba(55, 9, 238, 1)" }}
              unselectedStyle={{ backgroundColor: "rgba(234, 234, 234, 1)" }}
              markerStyle={{
                height: 20,
                width: 20,
                backgroundColor: "rgba(55, 9, 238, 1)",
                flexDirection: "row",
                alignItems: "center",
              }}
            />
          </View>
          <View style={styles.valueTextContainer}>
            <View style={styles.range}>
              <Text style={styles.valueText}>{rangeValues[0]}</Text>
            </View>
            <View style={styles.range}>
              <Text style={styles.valueText}>{rangeValues[1]}</Text>
            </View>
          </View>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => {
            if (filterTab) {
              setActiveTab(filterTab);
            }
            handleRangeChange(rangeValues[0], rangeValues[1]);
            handleClose();
          }}
        >
          <Text style={styles.texts}>Показать</Text>
        </Pressable>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  slider: {
    alignItems: "center",
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
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 89,
    backgroundColor: "rgba(234, 234, 234, 1)",
    paddingVertical: 8,
    borderRadius: 50,
    marginTop: 10,
    marginRight: 10,
  },
  activeItem: {
    backgroundColor: "rgba(55, 9, 238, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(55, 9, 238, 1)",
  },
  tetx: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(25, 25, 25, 1)",
    marginTop: 20,
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
  sliderContainer: {
    marginTop: 10,
  },
  valueTextContainer: {
    flexDirection: "row",
    gap: 10,
  },
  range: {
    width: "49%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(243, 245, 247, 1)",
  },
  valueText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(55, 9, 238, 1)",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  texts: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Modal;
