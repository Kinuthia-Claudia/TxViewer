import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Switch,
  View,
} from "react-native";
import { useBiometricAuth } from "../src/hooks/useBioAuth";

export default function AuthScreen() {
  const { isAuthenticated, isAvailable, error, isChecking, authenticate } =
    useBiometricAuth();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated]);

  const handleAuth = async () => {
    await authenticate(rememberMe);
  };

  if (isChecking) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.icon}>🔐</Text>
        <Text style={styles.title}>TxViewer</Text>
        <Text style={styles.subtitle}>Secure Transactions Viewer</Text>
      </View>

      <View style={styles.bottom}>
        {!isAvailable && (
          <Text style={styles.warning}>
            Biometric authentication not available on this device.
          </Text>
        )}

        <View style={styles.rememberRow}>
          <Text style={styles.rememberText}>Remember me</Text>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{ false: "#ddd", true: "#007AFF" }}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, !isAvailable && styles.buttonDisabled]}
          onPress={handleAuth}
        >
          <Text style={styles.buttonText}>
            {isAvailable ? "Authenticate" : "Enter App"}
          </Text>
        </TouchableOpacity>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f7",
    padding: 24,
  },
  top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 32, fontWeight: "800", color: "#1a1a1a" },
  subtitle: { fontSize: 14, color: "#888", marginTop: 8 },
  bottom: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 40,
  },
  warning: {
    fontSize: 13,
    color: "#FF9500",
    textAlign: "center",
    marginBottom: 16,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  rememberText: { fontSize: 14, color: "#555" },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#999" },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "600" },
  error: { color: "#FF3B30", fontSize: 14, marginTop: 12, textAlign: "center" },
});