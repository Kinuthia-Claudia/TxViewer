import { create } from "zustand";
import { ApiSource } from "../api/endpoints";

type UIState = {
  selectedSource: ApiSource;
  setSource: (source: ApiSource) => void;
};

export const useStore = create<UIState>((set) => ({
  selectedSource: "jsonplaceholder",
  setSource: (source) => set({ selectedSource: source }),
}));