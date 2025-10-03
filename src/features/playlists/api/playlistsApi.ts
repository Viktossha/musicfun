import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs,
} from "@/features/playlists/api/playlistsApi.types.ts";

export const playlistsApi = createApi({
  reducerPath: "playlistsApi",
  tagTypes: ["Playlist"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      "API-KEY": import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      );
      return headers;
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
      providesTags: ["Playlist"],
    }),
    createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
      query: (body) => {
        return {
          method: "post",
          url: "playlists",
          body,
        };
      },
      invalidatesTags: ["Playlist"],
    }),
    deletePlaylist: build.mutation<void, string>({
      query: (playlistId) => {
        return {
          method: "delete",
          url: `playlists/${playlistId}`,
        };
      },
      invalidatesTags: ["Playlist"],
    }),
    updatePlaylist: build.mutation<
      void,
      { playlistId: string; body: UpdatePlaylistArgs }
    >({
      query: ({ playlistId, body }) => {
        return {
          method: "put",
          url: `playlists/${playlistId}`,
          body,
        };
      },
      invalidatesTags: ["Playlist"],
    }),
  }),
});

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} = playlistsApi;
