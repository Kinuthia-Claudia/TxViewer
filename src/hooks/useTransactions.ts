import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchFromApi } from "../api/client";
import { mapJsonPlaceholder } from "../adapters/jsonplaceholder_adapter";
import { mapDummyJson } from "../adapters/dummyjson_adapter";
import { mapFakestore } from "../adapters/fakestore_adapter";
import { ApiSource } from "../api/endpoints";
import { Transaction } from "../models/transaction";
import { useStore } from "../store/use_store";
import { getErrorMessage } from "../utils/error_handler";


const adapters = {
  jsonplaceholder: mapJsonPlaceholder,
  dummyjson: (data: any) => mapDummyJson(data),
  fakestore: mapFakestore,
  combined: null as any,
};

const singleSources: ApiSource[] = ["jsonplaceholder", "dummyjson", "fakestore"];

export const useTransactions = () => {
  const selectedSource = useStore((state) => state.selectedSource);
  const setSource = useStore((state) => state.setSource);

  const isCombined = selectedSource === "combined";

  //combined for all sources
  const combinedQueries = useQueries({
    queries: singleSources.map((source) => ({
      queryKey: ["transactions", source],
      queryFn: async () => {
        const data = await fetchFromApi(source);
        return adapters[source as keyof typeof adapters](data);
      },
      staleTime: 5 * 60 * 1000,
    })),
    combine: (results) => {
      const allTransactions: Transaction[] = [];
      results.forEach((r) => {
        if (r.data) allTransactions.push(...r.data);
      });
      return {
        data: allTransactions,
        isLoading: results.some((r) => r.isLoading),
        error: results.find((r) => r.error)?.error ?? null,
        refetch: () => results.forEach((r) => r.refetch()),
      };
    },
  });

  //single source
  const query = useQuery({
    queryKey: ["transactions", selectedSource],
    queryFn: async () => {
      const data = await fetchFromApi(selectedSource);
      return adapters[selectedSource as keyof typeof adapters](data);
    },
    staleTime: 5 * 60 * 1000,
    enabled: !isCombined,
  });

  const activeQuery = isCombined ? combinedQueries : query;

  return {
    transactions: (activeQuery.data ?? []) as Transaction[],
    loading: activeQuery.isLoading as boolean,
    error: activeQuery.error ? getErrorMessage(activeQuery.error) : null,
    source: selectedSource,
    setSource,
    refetch: () => activeQuery.refetch(),
  };
};