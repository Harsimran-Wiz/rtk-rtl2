import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: "https://mocki.io/v1/" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "1a81b254-2cb4-498e-981e-7e4d38e3398f",
    }),
  }),
});

export const { useGetUserQuery } = api;
