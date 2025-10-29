import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { Item, useStore } from "../../store/useStore";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { items, editItem, removeItem, toggleBought, loadItems } = useStore();

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Item | undefined>(undefined);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("0");

  // Load items dari AsyncStorage saat pertama kali
  useEffect(() => {
    const fetch = async () => {
      await loadItems();
      setLoading(false);
    };
    fetch();
  }, []);

  // Sinkronkan data item saat items berubah
  useEffect(() => {
    const found = items.find((i) => i.id === id);
    setItem(found);
    if (found) {
      setName(found.name);
      setQuantity(String(found.quantity));
      setCategory(found.category ?? "");
      setPrice(String(found.price ?? "0"));
    }
  }, [items, id]);

  const handleSave = async () => {
    if (!item) return;
    if (!name.trim()) {
      Alert.alert("Validasi", "Nama wajib diisi");
      return;
    }

    await editItem(item.id, {
      name: name.trim(),
      quantity: Number(quantity) || 1,
      category: category.trim(),
      price: Number(price) || 0,
    });

    Toast.show({
      type: "success",
      text1: "Berhasil",
      text2: "Perubahan disimpan",
    });
    router.back();
  };

  const handleDelete = () => {
  if (!item) return;

  console.log("Hapus item ID:", item.id); // <-- cek di log dulu

  Alert.alert("Hapus item", "Yakin ingin menghapus?", [
    { text: "Batal", style: "cancel" },
    {
      text: "Hapus",
      style: "destructive",
      onPress: () => {
        removeItem(item.id)
          .then(() => {
            Toast.show({ type: "success", text1: "Item dihapus" });
            router.push("/");
          })
          .catch((err) => {
            console.error("Gagal hapus item:", err);
            Toast.show({ type: "error", text1: "Gagal menghapus item" });
          });
      },
    },
  ]);
};


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={{ marginTop: 10 }}>Memuat item...</Text>
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Item tidak ditemukan.</Text>
        <Button title="Kembali" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Detail Item</Text>

        <Text style={styles.label}>Nama</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Jumlah</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />

        <Text style={styles.label}>Kategori</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Harga</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>
            Simpan Perubahan
          </Text>
        </TouchableOpacity>

        <View style={{ height: 10 }} />
        <Button
          title={item.bought ? "Tandai Belum Dibeli" : "Tandai Sudah Dibeli"}
          onPress={() => toggleBought(item.id)}
        />
        <View style={{ height: 10 }} />
        <Button color="#EF4444" title="Hapus Item" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F7FB", padding: 16 },
  card: { padding: 16, backgroundColor: "#fff", borderRadius: 10 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  label: { marginTop: 8, marginBottom: 6, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  saveBtn: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
