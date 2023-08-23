import React, { useState } from "react";
import "./App.css";
import SidePanel from "./components/SidePanelComponents/SidePanel/SidePanel";
import chillHop from "./utils/data";
import Display from "./components/Display/Display";
import { Song } from "./types/song";
import PlayerControls from "./components/PlayerControls/PlayerControls";
import SoundWaves from "./components/SoundWaveComponent/SoundWave";

const songs = chillHop();

const App = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(
    songs[currentSongIndex]
  );

  const handleSelectSong = (song: Song) => {
    setSelectedSong(song);
    setCurrentSongIndex(songs.indexOf(song));
  };

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setSelectedSong(songs[nextIndex]);
  };

  const handlePrevious = () => {
    const previousIndex =
      currentSongIndex - 1 < 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(previousIndex);
    setSelectedSong(songs[previousIndex]);
  };

  const handleToggle = () => {
    console.log("toggleSidePanel");
    setIsActive(!isActive);
  };

  return (
    <div className="App">
      <div className={`panel ${isActive ? "active" : ""}`}>
        <SidePanel
          songs={songs}
          onSelectSong={handleSelectSong}
          onToggleSidePanel={handleToggle}
        />
      </div>
      <div className="player">
        {selectedSong ? (
          <div>
            <Display
              cover={selectedSong.cover}
              name={selectedSong.name}
              artist={selectedSong.artist}
            />
            <PlayerControls
              song={selectedSong}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>
        ) : null}
        <div className="wave-container">
          <div className="wave-top">
            <SoundWaves />
          </div>
          <div className="wave-bottom">
            <SoundWaves />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
