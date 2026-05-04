import { useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../api/client";
import { mapJsonPlaceholder } from "../adapters/jsonplaceholder_adapter";
import { mapDummyJson } from "../adapters/dummyjson_adapter";
import { mapFakestore } from "../adapters/fakestore_adapter";
import { ApiSource } from "../api/endpoints";
import { Transaction } from "../models/transaction";
import { useStore } from "../store/use_store";

const adapters: Record<ApiSource, (data: any) => Transaction[]> = {
  jsonplaceholder: mapJsonPlaceholder,
  dummyjson: mapDummyJson,
  fakestore: mapFakestore,
};

export const useTransactions = () => {
  const selectedSource = useStore((state) => state.selectedSource);
  const setSource = useStore((state) => state.setSource);

  const query = useQuery({
    queryKey: ["transactions", selectedSource],
    queryFn: async () => {
      const data = await fetchFromApi(selectedSource);
      return adapters[selectedSource](data);
    },
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  return {
    transactions: query.data ?? [],
    loading: query.isLoading,
    error: query.error?.message ?? null,
    source: selectedSource,
    setSource,
    refetch: query.refetch,
  };
};