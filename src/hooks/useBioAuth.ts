import { useState, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";

export const useBiometricAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAvailability();
  }, []);

  const checkAvailability = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setIsAvailable(compatible && enrolled);
  };

  const authenticate = async () => {
    setError(null);

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to view transactions",
        fallbackLabel: "Use passcode",
      });

      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch {
      setError("Could not authenticate. Please try again.");
    }
  };

  return { isAuthenticated, isAvailable, error, authenticate };
};