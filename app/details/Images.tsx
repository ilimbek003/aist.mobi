import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
  Text,
} from "react-native";

interface ImageItem {
  id: number;
  img: {
    id: number;
    img: string;
  }[];
}

interface ImagesProps {
  data: ImageItem[];
}

const Images: React.FC<ImagesProps> = ({ data }) => {
  const { width } = Dimensions.get("window");
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index ?? 0;
        setCurrentIndex(index);
      }
    }
  ).current;

  const renderItem = ({ item }: { item: ImageItem }) => (
    <View>
      {data.map((item) => (
        <View>
          <FlatList
            data={item.img}
            renderItem={({ item }) => (
              <View style={[styles.imageWrapper, { width }]} key={item.id}>
                <Image
                  source={{ uri: item.img }}
                  style={styles.img}
                  resizeMode="cover"
                />
              </View>
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onScroll={handleScroll}
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged}
          />
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItem} />
      {data.map((item) => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {item.img.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const outputRange = [10, 30, 10];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange,
              extrapolate: "clamp",
            });
            const dotColor =
              i === currentIndex
                ? "rgba(55, 9, 238, 1)"
                : "rgba(210, 210, 210, 1)";
            return (
              <Animated.View
                key={i.toString()}
                style={[
                  styles.dot,
                  { width: dotWidth, backgroundColor: dotColor },
                ]}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 0,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 16,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(210, 210, 210, 1)",
    marginHorizontal: 5,
    marginBottom: 20,
    marginTop: 30,
  },
});

export default Images;
