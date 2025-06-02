import React, { useState } from "react";
import "./App.css";
import SidePanel from "./components/SidePanelComponents/SidePanel/SidePanel";
import chillHop from "./utils/data";
import Display from "./components/Display/Display";
import { Song } from "./types/song";
import PlayerControls from "./components/PlayerControls/PlayerControls";
import WaveBackground from "./components/AnimatedComponents/WaveBackground";

const songs = chillHop();

const App: React.FC = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song>(
    songs[currentSongIndex]
  );
  const [isPlaying, setIsPlaying] = useState(false);

  // Change the playing state
  const handlePlayingChange = (playing: boolean) => {
    setIsPlaying(playing);
  };

  // Set a selected song
  const handleSelectSong = (song: Song) => {
    setSelectedSong(song);
    setCurrentSongIndex(songs.indexOf(song));
  };

  // Go to next song
  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setSelectedSong(songs[nextIndex]);
  };

  // Go to previous song
  const handlePrevious = () => {
    const previousIndex =
      currentSongIndex - 1 < 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(previousIndex);
    setSelectedSong(songs[previousIndex]);
  };

  // Choose the next song randomly
  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    setCurrentSongIndex(randomIndex);
    setSelectedSong(songs[randomIndex]);
  };

  // Toggle for mobile list view
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="App">
      <WaveBackground />
      <div className={`panel ${isActive ? "active" : ""}`}>
        <SidePanel
          songs={songs}
          onSelectSong={handleSelectSong}
          onToggleSidePanel={handleToggle}
          selectedSong={selectedSong}
          isPlaying={isPlaying}
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
              onShuffle={handleShuffle}
              onPlayingChange={handlePlayingChange}
            />
          </div>
        ) : null}
      </div>

    </div>
  );
};

export default App;
