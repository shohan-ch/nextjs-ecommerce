import { ISize } from "@/types/type";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { adminApi } from "./baseAdminApi";

const invalidateTags = (
  _result: unknown,
  error: FetchBaseQueryError | undefined,
) => {
  return error ? [] : (["Size"] as const);
};

type StatusPayload = { ids: number[]; status: number };

const sizeApi = adminApi.injectEndpoints({
  endpoints: (build) => ({
    getSizes: build.query<ISize[], void>({
      query: () => "/sizes",
      providesTags: ["Size"],
    }),

    createSize: build.mutation<ISize, Partial<ISize>>({
      query: (data) => ({
        url: "/sizes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: invalidateTags,
    }),

    updateSize: build.mutation<void, Partial<ISize>>({
      query: (data) => ({
        url: "/sizes/" + data.id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: invalidateTags,
    }),

    deleteSize: build.mutation<void, number>({
      query: (id) => ({
        url: "/sizes/" + id,
        method: "DELETE",
      }),
      invalidatesTags: invalidateTags,
    }),

    toggleSizeStatus: build.mutation<void, StatusPayload>({
      query: (data) => ({
        url: "/sizes/status-change",
        method: "POST",
        body: { ids: data.ids, status: data.status },
      }),
      invalidatesTags: invalidateTags,
    }),
  }),
});

export const {
  useGetSizesQuery,
  useCreateSizeMutation,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
  useToggleSizeStatusMutation,
} = sizeApi;