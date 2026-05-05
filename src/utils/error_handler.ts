export class AppError extends Error {
  constructor(
    message: string,
    public type: "network" | "timeout" | "server" | "unknown"
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    switch (error.type) {
      case "network":
        return "No internet connection. Check your network and try again.";
      case "timeout":
        return "Request took too long. Please try again.";
      case "server":
        return "Server error. Please try again later.";
      default:
        return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof AppError && error.type === "network";
};