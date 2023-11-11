import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { MyJobs, PopularJobs, Search } from "../components";
import { SIZES } from "../constants";
import { Stack } from "expo-router";

export default function index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#eee" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsHorizontalScrollIndicator={false} >
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Search />
          <MyJobs />
          <PopularJobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
