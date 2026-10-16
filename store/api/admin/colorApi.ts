import { IColor } from "@/types/type";
import { adminApi } from "./api";

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

      invalidatesTags: (result, error) => (error ? [] : ["Color"]),
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
      invalidatesTags: (result, error) => (error ? [] : ["Color"]),
    }),

    deleteColor: build.mutation({
      query: (id: number) => {
        return {
          url: "/colors/" + id,
          method: "DELETE",
        };
      },

      invalidatesTags: (result, error) => (error ? [] : ["Color"]),
    }),
  }),
});

export const {
  useGetColorsQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = userApi;
