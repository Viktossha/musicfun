import { Route, Routes } from "react-router";
import { PageNotFound } from "@/common/components";
import { MainPage } from "@/app/ui";
import { PlaylistsPage } from "@/features/playlists/ui";
import { TracksPage } from "@/features/tracks/ui";
import { ProfilePage } from "@/features/auth/ui";

export const Path = {
  Main: "/",
  Playlists: "/playlists",
  Tracks: "/tracks",
  Profile: "/profile",
  NotFound: "*",
} as const;

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    <Route path={Path.Playlists} element={<PlaylistsPage />} />
    <Route path={Path.Tracks} element={<TracksPage />} />
    <Route path={Path.Profile} element={<ProfilePage />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
);
