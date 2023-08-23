import React, { useState } from "react";
import SongList from "../SongList/SongList";
import { Song } from "../../../types/song";
import "./SidePanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";

interface SidePanelProps {
  songs: Song[];
  onSelectSong: (song: Song) => void;
  onToggleSidePanel: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({
  songs,
  onSelectSong,
  onToggleSidePanel,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="side-panel">
      <div className="line" onClick={onToggleSidePanel}></div>
      <h2>Library</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <FontAwesomeIcon
          className="icon-search"
          icon={searchTerm ? faX : faMagnifyingGlass}
          onClick={() => searchTerm && setSearchTerm("")}
        />
      </div>
      <SongList songs={filteredSongs} onSelectSong={onSelectSong} />
    </div>
  );
};

export default SidePanel;
