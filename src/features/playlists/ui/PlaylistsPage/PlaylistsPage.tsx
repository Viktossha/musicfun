import { useFetchPlaylistsQuery } from "@/features/playlists/api/playlistsApi.ts";
import s from "./PlaylistsPage.module.css";
import { CreatePlaylistForm } from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx";
import { type ChangeEvent, useState } from "react";
import { useDebounceValue } from "@/common/hooks";
import { Pagination } from "@/common/components";
import { PlaylistsList } from "@/features/playlists/ui/PlaylistsPage/PlaylistsList/PlaylistsList.tsx";

export const PlaylistsPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const debounceSearch = useDebounceValue(search);
  const { data, isLoading } = useFetchPlaylistsQuery({
    search: debounceSearch,
    pageSize,
    pageNumber: currentPage,
  });

  const changePageSizeHandler = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setCurrentPage(1);
  };

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input
        type="search"
        placeholder={"Search playlist by title"}
        onChange={searchPlaylistHandler}
      />
      <PlaylistsList playlists={data?.data || []} isPlaylistsLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        changePageSize={changePageSizeHandler}
      />
    </div>
  );
};
