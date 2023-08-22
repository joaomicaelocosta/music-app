import React from "react";
import { Song } from "../../../types/song";
import "./SongItem.css";

interface SongItemProps {
  song: Song;
  onSelectSong?: (song: Song) => void;
}

const SongItem: React.FC<SongItemProps> = ({ song, onSelectSong }) => {
  return (
    <li
      className="song-item"
      onClick={() => onSelectSong && onSelectSong(song)}
    >
      <div className="song-cover">
        <img src={song.cover} alt={song.name} />
      </div>
      <div className="song-details">
        <div className="song-name">{song.name}</div>
        <div className="song-artist">{song.artist}</div>
      </div>
    </li>
  );
};

export default SongItem;
