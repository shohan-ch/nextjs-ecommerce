import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { adminApi } from "./baseAdminApi";

export interface ICategory {
  id: number;
  name: string;
  status: number;
  createdAt?: string;
  updatedAt?: string;
}

const invalidateTags = (
  _result: unknown,
  error: FetchBaseQueryError | undefined,
) => {
  return error ? [] : (["Category"] as const);
};

type StatusPayload = { ids: number[]; status: number };

const categoryApi = adminApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<ICategory[], void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),

    createCategory: build.mutation<ICategory, Partial<ICategory>>({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: invalidateTags,
    }),

    updateCategory: build.mutation<void, Partial<ICategory>>({
      query: (data) => ({
        url: "/categories/" + data.id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: invalidateTags,
    }),

    deleteCategory: build.mutation<void, number>({
      query: (id) => ({
        url: "/categories/" + id,
        method: "DELETE",
      }),
      invalidatesTags: invalidateTags,
    }),

    toggleCategoryStatus: build.mutation<void, StatusPayload>({
      query: (data) => ({
        url: "/categories/status-change",
        method: "POST",
        body: { ids: data.ids, status: data.status },
      }),
      invalidatesTags: invalidateTags,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useToggleCategoryStatusMutation,
} = categoryApi;
