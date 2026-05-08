import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ApiSource } from "../api/endpoints";

type Props = {
  current: ApiSource;
  onChange: (source: ApiSource) => void;
};

const sources: { key: ApiSource; label: string }[] = [
  { key: "jsonplaceholder", label: "JSONPlaceholder" },
  { key: "dummyjson", label: "DummyJSON" },
  { key: "fakestore", label: "Fake Store" },
];

export const ApiSwitcher = ({ current, onChange }: Props) => {
  return (
    <View style={styles.container}>
      {sources.map((s) => (
        <TouchableOpacity
          key={s.key}
          style={[styles.button, current === s.key && styles.active]}
          onPress={() => onChange(s.key)}
        >
          <Text style={[styles.text, current === s.key && styles.activeText]}>
            {s.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
    marginBottom: 12,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  active: {
    backgroundColor: "#007AFF",
  },
  text: {
    fontSize: 12,
    color: "#333",
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});