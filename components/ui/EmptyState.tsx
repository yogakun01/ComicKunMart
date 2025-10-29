// components/EmptyState.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Belum ada item</Text>
      <Text style={styles.desc}>Tambahkan item pertamamu dengan tombol + Add</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 40, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  desc: { color: "#6B7280", textAlign: "center" },
});