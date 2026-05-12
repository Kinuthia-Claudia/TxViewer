import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Modal, FlatList } from "react-native";
import { ApiSource } from "../api/endpoints";

type Props = {
  current: ApiSource;
  onChange: (source: ApiSource) => void;
};

const sources: { key: ApiSource; label: string }[] = [
  { key: "jsonplaceholder", label: "JSONPlaceholder" },
  { key: "dummyjson", label: "DummyJSON" },
  { key: "fakestore", label: "Fake Store" },
  { key: "combined", label: "All Sources" },
];

export const ApiSwitcher = ({ current, onChange }: Props) => {
  const [visible, setVisible] = useState(false);

  const currentLabel = sources.find((s) => s.key === current)?.label || "Select";

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdown} onPress={() => setVisible(true)}>
        <Text style={styles.dropdownText}>{currentLabel}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.menu}>
            {sources.map((s) => (
              <TouchableOpacity
                key={s.key}
                style={[styles.item, current === s.key && styles.itemActive]}
                onPress={() => {
                  onChange(s.key);
                  setVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.itemText,
                    current === s.key && styles.itemTextActive,
                  ]}
                >
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
  },
  arrow: {
    fontSize: 10,
    color: "#888",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  menu: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemActive: {
    backgroundColor: "#007AFF",
  },
  itemText: {
    fontSize: 15,
    color: "#333",
  },
  itemTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
});