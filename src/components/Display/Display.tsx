import React from "react";
import "./Display.css";

interface DisplayProps {
  cover: string;
  name: string;
  artist: string;
}

const Display: React.FC<DisplayProps> = ({ cover, name, artist }) => (
  <div className="display-container">
    <img src={cover} alt="cover" />
    <div className="song-info">
      <h2 className="song-title">{name}</h2>
      <p className="song-artist">{artist}</p>
    </div>
  </div>
);

export default Display;
