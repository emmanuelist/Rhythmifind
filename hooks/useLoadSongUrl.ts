import { Song } from "@/types";
import {
  SupabaseClient,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

const useLoadSongUrl = (song: Song) => {
  const supabaseCLient = useSupabaseClient();

  if (!song) {
    return "";
  }

  const { data: songData } = supabaseCLient.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
};

export default useLoadSongUrl;
