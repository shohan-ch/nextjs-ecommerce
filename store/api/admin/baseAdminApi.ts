import { environmet } from "@/environments/environment";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: environmet.apiUrl + "/admin" }),
  endpoints: () => ({}),
  tagTypes: ["Color", "Size"],
});
