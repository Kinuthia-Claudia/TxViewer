import { useState, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

const AUTH_KEY = "txviewer_auth";

export const useBiometricAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkStoredAuth();
  }, []);

  const checkStoredAuth = async () => {
    try {
      const stored = await SecureStore.getItemAsync(AUTH_KEY);
      if (stored === "true") {
        setIsAuthenticated(true);
      }
      await checkAvailability();
    } catch {
      // ignore
    } finally {
      setIsChecking(false);
    }
  };

  const checkAvailability = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setIsAvailable(compatible && enrolled);
  };

  const authenticate = async (remember: boolean = false) => {
  setError(null);

  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to view transactions",
      fallbackLabel: "Use passcode",
    });

    if (result.success) {
      if (remember) {
        await SecureStore.setItemAsync(AUTH_KEY, "true");
      }
      setIsAuthenticated(true);
    } else {
      setError("Authentication failed. Please try again.");
    }
  } catch {
    setError("Could not authenticate. Please try again.");
  }
};
  const logout = async () => {
    await SecureStore.deleteItemAsync(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isAvailable, error, isChecking, authenticate, logout };
};