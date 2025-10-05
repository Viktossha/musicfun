import s from "./PlaylistCover.module.css";
import defaultCover from "@/assets/images/default-playlist-cover.png";
import type { ChangeEvent } from "react";
import {
  useDeletePlaylistCoverMutation,
  useUploadPlaylistCoverMutation,
} from "@/features/playlists/api/playlistsApi.ts";
import type { Images } from "@/common/types";
import { toast } from "react-toastify";

type Props = {
  playlistId: string;
  images: Images;
};
export const PlaylistCover = ({ images, playlistId }: Props) => {
  const originalCover = images.main.find((img) => img.type === "original");
  const src = originalCover ? originalCover.url : defaultCover;

  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation();
  const [deletePlaylistCover] = useDeletePlaylistCoverMutation();

  const uploadCoverHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 1024 * 1024; // 1 MB
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    const file = e.target.files?.length && e.target.files[0];
    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      toast("Only JPEG, PNG or GIF images are allowed", { type: "error", theme: "colored" });
      return;
    }
    if (file.size > maxSize) {
      toast(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`, {
        type: "error",
        theme: "colored",
      });
      return;
    }
    uploadPlaylistCover({ playlistId, file });
  };

  const deleteCoverHandler = () => {
    deletePlaylistCover(playlistId);
  };

  return (
    <>
      <img src={src} alt="cover" className={s.cover} width={"240px"} />
      <input
        type="file"
        onChange={uploadCoverHandler}
        accept={"image/jpeg, image/png, image/gif"}
      />
      {originalCover && <button onClick={deleteCoverHandler}>delete</button>}
    </>
  );
};
