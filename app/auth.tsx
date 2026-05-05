import { router } from "expo-router";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useBiometricAuth } from "../src/hooks/useBioAuth";

export default function AuthScreen() {
  const { isAvailable, error, authenticate } = useBiometricAuth();

  const handleAuth = async () => {
    await authenticate();
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.title}>TxViewer</Text>
      <Text style={styles.subtitle}>Secure Transactions Viewer</Text>

      {!isAvailable && (
        <Text style={styles.warning}>
          Biometric authentication not available on this device.
        </Text>
      )}

      <TouchableOpacity
        style={[styles.authButton, !isAvailable && styles.disabled]}
        onPress={handleAuth}
      >
        <Text style={styles.authButtonText}>
          {isAvailable ? "Authenticate" : "Enter App"}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 24,
  },
  title: { fontSize: 28, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#888", marginBottom: 24 },
  warning: { fontSize: 13, color: "#FF9500", textAlign: "center", marginBottom: 12 },
  authButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
  },
  disabled: { backgroundColor: "#999" },
  authButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  error: { color: "red", fontSize: 14, marginTop: 8 },
});