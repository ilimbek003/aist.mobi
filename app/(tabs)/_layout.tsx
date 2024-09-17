import { Tabs } from "expo-router";
import { getItem } from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "rgba(55, 9, 238, 1)",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
        },
        tabBarStyle: {
          height: 55,
          paddingTop: 8,
          zIndex: 1000,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/images/navbar.png")}
                />
              ) : (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/images/navbars.png")}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: "Каталог",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/images/cata.png")}
                />
              ) : (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/images/catas.png")}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          title: "Корзина",
          tabBarIcon: ({ focused }) => (
            <View style={{ position: "relative" }}>
              {focused ? (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/images/cart.png")}
                />
              ) : (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/images/carts.png")}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/images/pro.png")}
                />
              ) : (
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/images/pros.png")}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
