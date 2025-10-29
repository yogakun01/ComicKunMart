import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EmptyState from "../../components/ui/EmptyState";
import Header from "../../components/ui/Header";
import ShoppingItem from "../../components/ui/ShoppingItem";
import { useStore } from "../../store/useStore";

export default function Home() {
  const router = useRouter();
  const { items, loadItems, removeItem, toggleBought } = useStore();
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        (i.category || "").toLowerCase().includes(q)
    );
  }, [items, query]);

  const handleDelete = (id: string) => {
    Alert.alert("Hapus item", "Yakin ingin menghapus item ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          await removeItem(id);
          await loadItems(); // auto refresh list
        },
      },
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadItems();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Header title="ComicKunMart" />
      <View style={styles.controls}>
        <TextInput
          placeholder="Cari nama atau kategori..."
          style={styles.search}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push("/add")}
        >
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ marginTop: 16 }}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShoppingItem
            item={item}
            onPress={() => router.push(`/${item.id}`)}
            onDelete={() => handleDelete(item.id)}
            onToggle={() => toggleBought(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListEmptyComponent={<EmptyState />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F7FB" },
  controls: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
  },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  addBtn: {
    marginLeft: 10,
    backgroundColor: "#4F46E5",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addBtnText: { color: "#fff", fontWeight: "600" },
  sep: { height: 8 },
});
