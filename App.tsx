import React from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import { useTransactions } from "./src/hooks/view_transactions";

export default function App() {
  const { transactions, loading, error } = useTransactions();

  // 1. Loading
  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading transactions...</Text>
      </SafeAreaView>
    );
  }

  // 2. Error
  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </SafeAreaView>
    );
  }

  // 3. Success - show the list
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>${item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  error: { color: "red" },
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cardTitle: { fontSize: 14, fontWeight: "600" },
});