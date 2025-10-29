import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Item } from "../../store/useStore";

type Props = {
  item: Item;
  onPress?: () => void;
  onDelete?: () => void;
  onToggle?: () => void;
};

export default function ShoppingItem({ item, onPress, onDelete, onToggle }: Props) {
  return (
    <View style={[styles.container, item.bought && styles.bought]}>
      {/* Klik kiri untuk ke detail */}
      <TouchableOpacity style={styles.left} onPress={onPress}>
        <Text style={[styles.name, item.bought && styles.nameBought]}>
          {item.name}
        </Text>
        <Text style={styles.meta}>
          {item.quantity} • {item.category || "No category"} • Rp{item.price || 0}
        </Text>
      </TouchableOpacity>

      {/* Aksi kanan */}
      <View style={styles.right}>
        {/* Tombol toggle status dibeli */}
        <TouchableOpacity onPress={onToggle} style={styles.toggle}>
          <Text
            style={{
              color: item.bought ? "#065F46" : "#374151",
              fontWeight: "700",
            }}
          >
            {item.bought ? "✓" : "•"}
          </Text>
        </TouchableOpacity>

        {/* Tombol hapus item */}
        <TouchableOpacity onPress={onDelete} style={styles.del}>
          <Text style={{ color: "#EF4444", fontWeight: "700" }}>Del</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ECECEC",
    marginBottom: 8,
  },
  bought: {
    backgroundColor: "#ECFDF5",
  },
  left: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  nameBought: {
    textDecorationLine: "line-through",
    color: "#6B7280",
  },
  meta: {
    color: "#6B7280",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggle: {
    marginRight: 12,
    padding: 6,
  },
  del: {
    padding: 6,
  },
});
