import React from "react";
import { Song } from "../../../types/song";
import SongItem from "../SongItem/SongItem";

import "./SongList.css";

interface SongListProps {
  songs: Song[];
  onSelectSong: (song: Song) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, onSelectSong }) => {
  return (
    <div className="song-list">
      <ul>
        {songs.map((song) => (
          <SongItem key={song.id} song={song} onSelectSong={onSelectSong} />
        ))}
      </ul>
    </div>
  );
};

export default SongList;
