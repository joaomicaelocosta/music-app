import React from "react";
import { Song } from "../../../types/song";
import SongItem from "../SongItem/SongItem";

import "./SongList.css";

interface SongListProps {
  songs: Song[];
  onSelectSong: (song: Song) => void;
  selectedSong: Song;
  isPlaying: boolean;
}

const SongList: React.FC<SongListProps> = ({
  songs,
  onSelectSong,
  selectedSong,
  isPlaying,
}) => {
  return (
    <div className="song-list">
      <ul>
        {songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            onSelectSong={onSelectSong}
            selectedSong={selectedSong}
            isPlaying={isPlaying}
          />
        ))}
      </ul>
    </div>
  );
};

export default SongList;
