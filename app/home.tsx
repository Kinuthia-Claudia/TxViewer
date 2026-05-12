import { router } from "expo-router";
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
import { useBiometricAuth } from "../src/hooks/useBioAuth";

const queryClient = new QueryClient();

function HomeContent() {
  const { transactions, loading, error, source, setSource, refetch } =
    useTransactions();
  const { logout } = useBiometricAuth();

  const handleLogout = () => {
    logout();
    router.replace("/auth");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading transactions...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (transactions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TxViewer</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <ApiSwitcher current={source} onChange={setSource} />
        <View style={styles.center}>
          <Text style={styles.emptyText}>No transactions found</Text>
          <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
            <Text style={styles.retryText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TxViewer</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <ApiSwitcher current={source} onChange={setSource} />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.cardBottom}>
              <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
              <Text style={styles.source}>{item.source}</Text>
            </View>
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
  container: { flex: 1, backgroundColor: "#f5f5f5", paddingTop: 60 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  headerTitle: { fontSize: 24, fontWeight: "700" },
  logoutText: { fontSize: 14, color: "#FF3B30", fontWeight: "600" },
  loadingText: { fontSize: 14, color: "#888" },
  errorText: { color: "red", fontSize: 15, textAlign: "center" },
  emptyText: { fontSize: 15, color: "#888" },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: "#fff", fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    marginHorizontal: 12,
    marginVertical: 5,
    borderRadius: 8,
  },
  cardTitle: { fontSize: 15, fontWeight: "600", marginBottom: 6 },
  cardBottom: { flexDirection: "row", justifyContent: "space-between" },
  amount: { fontSize: 16, fontWeight: "700", color: "#007AFF" },
  source: { fontSize: 12, color: "#888" },
});