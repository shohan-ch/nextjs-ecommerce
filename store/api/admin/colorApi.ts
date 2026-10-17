import { IColor } from "@/types/type";
import { adminApi } from "./api";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const invalidateTags = (
  result: any,
  error: FetchBaseQueryError | undefined,
) => {
  return error ? [] : (["Color"] as const);
};

type StatusType = { ids: number[]; status: number };

const userApi = adminApi.injectEndpoints({
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

    deleteColor: build.mutation({
      query: (id: number) => {
        return {
          url: "/colors/" + id,
          method: "DELETE",
        };
      },

      invalidatesTags: invalidateTags,
    }),

    toggelStatus: build.mutation<void, StatusType>({
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
  useToggelStatusMutation,
} = userApi;
