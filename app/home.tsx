import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { useTransactions } from "../src/hooks/useTransactions";
import { ApiSwitcher } from "../src/components/api_switcher";

const queryClient = new QueryClient();

function HomeContent() {
  const { transactions, loading, error, source, setSource, refetch } =
    useTransactions();

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading transactions...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity onPress={() => refetch()} style={styles.retry}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <ApiSwitcher current={source} onChange={setSource} />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>${item.amount.toFixed(2)}</Text>
            <Text style={styles.source}>Source: {item.source}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default function HomeScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeContent />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  error: { color: "red", fontSize: 16 },
  retry: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#007AFF",
    borderRadius: 6,
  },
  retryText: { color: "#fff" },
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cardTitle: { fontSize: 14, fontWeight: "600" },
  source: { fontSize: 11, color: "#888", marginTop: 2 },
});