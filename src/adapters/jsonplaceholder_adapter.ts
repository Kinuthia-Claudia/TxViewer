import { Transaction } from "../models/transaction";

type JsonPlaceholderPost = {

  id: number;
  title: string;
  body: string;
};

export const mapJsonPlaceholder = (data: JsonPlaceholderPost[]): Transaction[] => {
  return data.map((item) => ({
    id: String(item.id),
    title: item.title,
    amount: Math.round(Math.random() * 10000 * 100) / 100,
    date: new Date().toISOString(),
    source: "jsonplaceholder",
  }));
};