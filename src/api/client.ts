import { endpoints, ApiSource } from "./endpoints";
import { AppError } from "../utils/error_handler";

const TIMEOUT_MS = 10000;

export const fetchFromApi = async (source: ApiSource) => {
  const url = endpoints[source];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new AppError(
        `Server error: ${response.status}`,
        response.status >= 500 ? "server" : "unknown"
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof AppError) throw error;

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new AppError("Request timed out", "timeout");
    }

    throw new AppError("Network request failed", "network");
  } finally {
    clearTimeout(timeout);
  }
};