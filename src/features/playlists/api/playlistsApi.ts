import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  FetchPlaylistsArgs,
  PlaylistsResponse,
} from "@/features/playlists/api/playlistsApi.types.ts";

export const playlistsApi = createApi({
  reducerPath: "playlistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      "API-KEY": import.meta.env.VITE_API_KEY,
    },
  }),
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
      query: () => {
        return {
          method: "get",
          url: "playlists",
        };
      },
    }),
  }),
});
