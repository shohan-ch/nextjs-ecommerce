import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { adminApi } from "./baseAdminApi";

export interface IBanner {
  id: number;
  title: string;
  link: string;
  status: string;
  image?: any;
  createdAt?: string;
  updatedAt?: string;
}

const invalidateTags = (
  _result: unknown,
  error: FetchBaseQueryError | undefined,
) => {
  return error ? [] : (["Banner"] as const);
};

type StatusPayload = { ids: number[]; status: number };

const bannerApi = adminApi.injectEndpoints({
  endpoints: (build) => ({
    getBanners: build.query<IBanner[], void>({
      query: () => "/banners",
      providesTags: ["Banner"],
    }),

    createBanner: build.mutation<IBanner, Partial<IBanner>>({
      query: (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });
        return {
          url: "/banners",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: invalidateTags,
    }),

    updateBanner: build.mutation<void, Partial<IBanner>>({
      query: (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value) formData.append(key, value);
        });
        return {
          url: "/banners/" + data.id,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: invalidateTags,
    }),

    deleteBanner: build.mutation<void, number>({
      query: (id) => ({
        url: "/banners/" + id,
        method: "DELETE",
      }),
      invalidatesTags: invalidateTags,
    }),

    toggleBannerStatus: build.mutation<void, StatusPayload>({
      query: (data) => ({
        url: "/banners/status-change",
        method: "POST",
        body: { ids: data.ids, status: data.status },
      }),
      invalidatesTags: invalidateTags,
    }),
  }),
});

export const {
  useGetBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useToggleBannerStatusMutation,
} = bannerApi;
