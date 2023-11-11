import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS, SIZES, filterJobTypes } from "../../../constants";
import { useRouter } from "expo-router";

export default function Search() {
  const [activeJobType, setActiveJobType] = useState("Full-time");
  const [term, setTerm] = useState("");

  const router = useRouter();

  const onPress = (item) => {
    setActiveJobType(item);
    router.push(`/search/${item}`);
  };

  const onSearchPress = () => {
    if (term.trim().length === 0) return;
    router.push(`/search/${term}`);
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
            value={term}
            onChangeText={(text) => setTerm(text)}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <FontAwesome
            name="search"
            size={25}
            color={COLORS.white}
            onPress={onSearchPress}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <FlatList
          data={filterJobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.filter(activeJobType, item)}
              onPress={() => onPress(item)}
            >
              <Text style={styles.filterTitle(activeJobType, item)}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `filter-job-${item}`}
          contentContainerStyle={{ columnGap: 10 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30,
    height: 50,
  },

  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.xSmall,
  },

  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  filterContainer: {
    alignItems: "center",
    marginTop: SIZES.xLarge,
  },

  filter: (activeFilterJob, item) => ({
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor:
      activeFilterJob === item ? COLORS.secondary : COLORS.lightWhite,
    backgroundColor:
      activeFilterJob === item ? COLORS.secondary : COLORS.lightWhite,
  }),

  filterTitle: (activeFilterJob, item) => ({
    color: activeFilterJob === item ? COLORS.white : COLORS.gray,
  }),
});
