import React, { useState } from "react";
import SongList from "../SongList/SongList";
import { Song } from "../../../types/song";
import "./SidePanel.css";

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
  return (
    <div className="side-panel">
      <div className="line" onClick={onToggleSidePanel}></div>
      <h2>Library</h2>
      <SongList songs={songs} onSelectSong={onSelectSong} />
    </div>
  );
};

export default SidePanel;
