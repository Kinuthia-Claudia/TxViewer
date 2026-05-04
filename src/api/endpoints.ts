export const endpoints = {
  jsonplaceholder: "https://jsonplaceholder.typicode.com/posts",
  dummyjson: "https://dummyjson.com/products",
  fakestore: "https://fakestoreapi.com/products",
  reqres: "https://reqres.in/api/users",
} as const;

export type ApiSource = keyof typeof endpoints;