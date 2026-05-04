import { endpoints, ApiSource } from "./endpoints";

const TIMEOUT_MS = 10000;

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const fetchFromApi = async (source: ApiSource) => {
  const url = endpoints[source];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try { 
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new ApiError(`HTTP ${response.status}`, response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("Request timed out");
    }

    throw new ApiError("Network request failed");
  } finally {
    clearTimeout(timeout);
  }
};