import React from "react";
import { Song } from "../../../types/song";
import "./SongItem.css";
import AudioBars from "../../AnimatedComponents/AudioBars";

interface SongItemProps {
  song: Song;
  onSelectSong?: (song: Song) => void;
  selectedSong: Song;
}

const SongItem: React.FC<SongItemProps> = ({
  song,
  onSelectSong,
  selectedSong,
}) => {
  const isSelected = selectedSong === song;

  return (
    <li
      className={isSelected ? "song-item active" : "song-item"}
      onClick={() => onSelectSong && onSelectSong(song)}
    >
      <div className="song-cover">
        <img src={song.cover} alt={song.name} />
      </div>
      <div className="song-details">
        <div className="song-name">{song.name}</div>
        <div className="song-artist">{song.artist}</div>
      </div>
      <div className="song-icon">{isSelected && <AudioBars />}</div>
    </li>
  );
};

export default SongItem;
