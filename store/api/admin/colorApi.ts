import { IColor } from "@/types/type";
import { adminApi } from "./baseAdminApi";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const invalidateTags = (
  _result: unknown,
  error: FetchBaseQueryError | undefined,
) => {
  return error ? [] : (["Color"] as const);
};

type StatusPayload = { ids: number[]; status: number };

const colorApi = adminApi.injectEndpoints({
  endpoints: (build) => ({
    getColors: build.query<IColor[], void>({
      query: () => "/colors",
      providesTags: ["Color"],
    }),

    createColor: build.mutation<IColor, Partial<IColor>>({
      query: (data) => ({
        url: "/colors",
        method: "POST",
        body: data,
      }),

      invalidatesTags: invalidateTags,
    }),

    updateColor: build.mutation<void, Partial<IColor>>({
      query: (data) => {
        const { id } = data;
        return {
          url: "/colors/" + id,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: invalidateTags,
    }),

    deleteColor: build.mutation<void, number>({
      query: (id: number) => {
        return {
          url: "/colors/" + id,
          method: "DELETE",
        };
      },

      invalidatesTags: invalidateTags,
    }),

    toggleStatus: build.mutation<void, StatusPayload>({
      query: (data) => {
        return {
          url: "/colors/status-change",
          method: "POST",
          body: { ids: data.ids, status: data.status },
        };
      },

      invalidatesTags: invalidateTags,
    }),
  }),
});

export const {
  useGetColorsQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
  useToggleStatusMutation,
} = colorApi;
