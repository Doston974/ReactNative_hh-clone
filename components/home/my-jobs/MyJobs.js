import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import useRequest from "../../../hooks/useRequest";
import { COLORS, SIZES } from "./../../../constants/theme";
import MyJobsItem from "./my-jobs-item/MyJobsItem";

export default function MyJobs() {
  const [selectedJob, setSelectedJob] = useState(null);

  const { data, isLoading, error } = useRequest("search", {
    query: "React native",
    page: "1",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jobs for you</Text>

      <View style={styles.jobsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"small"} color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <MyJobsItem
                item={item}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
              />
            )}
            keyExtractor={(item) => `job-${item.job_id}`}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            scrollEnabled={false}
            nestedScrollEnabled={true}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  title: {
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
  },
  jobsContainer: {
    marginTop: SIZES.medium,
  },
});
