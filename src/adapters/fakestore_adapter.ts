import { Transaction } from "../models/transaction";
type FakestoreProduct = {
  id: number;
  title: string;
  price: number;
   };

export const mapFakestore = (data: FakestoreProduct[]): Transaction[] => {
  return data.map((item) => ({
    id: item.id.toString(),
    title: item.title,
    amount: item.price,
    date: new Date().toISOString(),
    source: "fakestore",
  }));
};