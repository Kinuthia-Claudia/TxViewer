import { useState, useEffect, useCallback } from "react";
import { Transaction } from "../models/transaction";
import { fetchFromApi } from "../api/client";
import { mapJsonPlaceholder } from "../adapters/jsonplaceholder_adapter";
import { ApiSource } from "../api/endpoints";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<ApiSource>("jsonplaceholder");

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchFromApi(source);
      const normalized = mapJsonPlaceholder(data);
      setTransactions(normalized);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [source]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error, source, setSource, refetch: fetchTransactions };
};