import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../../store/useStore";

export default function AddScreen() {
  const router = useRouter();
  const { addItem } = useStore();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("0"); // <-- tambahkan state price

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Validasi", "Nama item wajib diisi");
      return;
    }
    const qnum = Number(quantity) || 1;
    const pnum = Number(price) || 0;

    addItem({
      id: uuidv4(),
      name: name.trim(),
      quantity: qnum,
      category: category.trim(),
      bought: false,
      price: pnum,
      createdAt: new Date().toISOString(),
    });


    Toast.show({
      type: "success",
      text1: "Berhasil",
      text2: `${name} ditambahkan`,
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Nama Item</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Jumlah</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />

        <Text style={styles.label}>Kategori (opsional)</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Harga/chapter</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Simpan</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
        <Button title="Batal" color="#777" onPress={() => router.back()} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F7FB" },
  form: { padding: 16 },
  label: { marginTop: 10, marginBottom: 6, color: "#333", fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  saveBtn: {
    backgroundColor: "#059669",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "700" },
});
