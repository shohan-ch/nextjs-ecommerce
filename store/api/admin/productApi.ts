import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { adminApi } from "./baseAdminApi";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  image?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

type ProductPayload = {
  name: string;
  description: string;
  image?: File;
};
type StatusPayload = { ids: number[]; status: number };

const invalidateTags = (
  _result: unknown,
  error: FetchBaseQueryError | undefined,
) => {
  return error ? [] : (["Product"] as const);
};

const productApi = adminApi
  .enhanceEndpoints({ addTagTypes: ["Product"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getProducts: build.query<IProduct[], void>({
        query: () => "/products",
        providesTags: ["Product"],
      }),

      createProduct: build.mutation<IProduct, ProductPayload>({
        query: (data) => {
          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("description", data.description);
          if (data.image) formData.append("image", data.image);
          return {
            url: "/products",
            method: "POST",
            body: formData,
          };
        },
        invalidatesTags: invalidateTags,
      }),

      updateProduct: build.mutation<void, ProductPayload & { id: number }>({
        query: ({ id, ...data }) => {
          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("description", data.description);
          if (data.image) formData.append("image", data.image);
          return {
            url: "/products/" + id,
            method: "PUT",
            body: formData,
          };
        },
        invalidatesTags: invalidateTags,
      }),

      deleteProduct: build.mutation<void, number>({
        query: (id) => ({
          url: "/products/" + id,
          method: "DELETE",
        }),
        invalidatesTags: invalidateTags,
      }),

      toggleProductStatus: build.mutation<void, StatusPayload>({
        query: (data) => ({
          url: "/products/status-change",
          method: "POST",
          body: { ids: data.ids, status: data.status },
        }),
        invalidatesTags: invalidateTags,
      }),
    }),
  });

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useToggleProductStatusMutation,
} = productApi;
