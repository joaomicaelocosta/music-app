import React, { useRef, useState, useEffect } from "react";
import { Song } from "../../types/song";
import "./PlayerControls.css";

interface PlayerControlsProps {
  song: Song;
  onNext: () => void;
  onPrevious: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  song,
  onNext,
  onPrevious,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  /* const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        setVolume(prevVolume);
        audioRef.current.volume = prevVolume;
      } else {
        setPrevVolume(volume);
        setVolume(0);
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  }; */

  const onPlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onScrub = (value: string) => {
    setProgress(Number(value));
    if (audioRef.current) {
      audioRef.current.currentTime =
        (Number(value) / 100) * audioRef.current.duration;
    }
  };

  const handleNext = () => {
    onNext();
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    onPrevious();
    setIsPlaying(true);
  };
  useEffect(() => {
    setProgress(0);

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      if (isPlaying) {
        audioRef.current.play().catch((error) => console.log(error));
      }
    }
  }, [song, isPlaying]);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const progressValue =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(progressValue);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
    }
  }, []);

  return (
    <div className="player-container">
      <div className="scroller">
        <input
          className="progress-bar"
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => onScrub(e.target.value)}
        />
        <div className="volume-control">
          <i
            className={` ${
              volume === 0 ? "fas fa-volume-off" : "fas fa-volume-up"
            }`}
          ></i>
          <div className="volume-slider">
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="100"
              value={volume * 100}
              onChange={onVolumeChange}
            />
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={song.audio} />
      <div className="player-controls">
        <button className="icon-button" onClick={handlePrevious}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button play" onClick={onPlayPause}>
          {isPlaying ? (
            <i className="fas fa-pause"></i>
          ) : (
            <i className="fas fa-play"></i>
          )}
        </button>
        <button className="icon-button" onClick={handleNext}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
