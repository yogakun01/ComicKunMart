// components/Header.tsx
import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

export default function Header({ title }: { title?: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title ?? "ComicKunMart"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 18 : 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#F1F1F1",
  },
  title: { fontSize: 20, fontWeight: "800", color: "#111827" },
});
