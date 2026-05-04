import { Transaction } from "../models/transaction";

type DummyJsonProduct = {
  id: number;
  title: string;
  price: number;
};

export const mapDummyJson = (data: { products: DummyJsonProduct[] }): Transaction[] => {
  return data.products.map((item) => ({
    id: String(item.id),
    title: item.title,
    amount: item.price,
    date: new Date().toISOString(),
    source: "dummyjson",
  }));
};