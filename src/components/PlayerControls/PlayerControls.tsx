import React, { useRef, useState, useEffect } from "react";
import { Song } from "../../types/song";
import "./PlayerControls.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle, faRepeat } from "@fortawesome/free-solid-svg-icons";

interface PlayerControlsProps {
  song: Song;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle: () => void;
  onPlayingChange: (playing: boolean) => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  song,
  onNext,
  onPrevious,
  onShuffle,
  onPlayingChange,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioLength, setAudioLength] = useState(0);

  // Change volume
  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    const volume = `${Number(e.target.value)}%`;
    document.documentElement.style.setProperty("--volume", volume);
  };

  // Play or pause the song
  const onPlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      onPlayingChange(!isPlaying);
    }
  };

  // Scrub through the song
  const onScrub = (value: string) => {
    setProgress(Number(value));
    document.documentElement.style.setProperty("--progress", value + "%");
    if (audioRef.current) {
      audioRef.current.currentTime =
        (Number(value) / 100) * audioRef.current.duration;
    }
  };

  // Go to next song
  const handleNext = () => {
    if (shuffle) {
      onShuffle();
    } else {
      onNext();
    }
    setIsPlaying(true);
  };

  // Go to previous song
  const handlePrevious = () => {
    if (shuffle) {
      onShuffle();
    } else {
      onPrevious();
    }
    setIsPlaying(true);
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // On song change check if shuffle or repeat is on
  useEffect(() => {
    const handleTransition = () => {
      if (repeat) {
        audioRef.current?.play();
      } else if (shuffle) {
        onShuffle();
      } else {
        onNext();
      }
      setIsPlaying(true);
    };

    if (audioRef.current) {
      audioRef.current.onended = handleTransition;
    }
  }, [repeat, shuffle]);

  // Reset progress bar on song change
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

  // Update progress bar
  useEffect(() => {
    document.documentElement.style.setProperty("--volume", "100%");

    const updateProgress = () => {
      if (audioRef.current) {
        const progressValue =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        document.documentElement.style.setProperty(
          "--progress",
          progressValue + "%"
        );
        setProgress(progressValue);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
    }
  }, []);

  // Update current time
  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      setAudioLength(audioElement.duration);

      const updateTime = () => {
        setCurrentTime(audioElement.currentTime);
      };

      audioElement.addEventListener("timeupdate", updateTime);
      audioElement.addEventListener("loadedmetadata", () => {
        setAudioLength(audioElement.duration);
      });

      return () => {
        audioElement.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [audioRef]);

  return (
    <div className="player-container">
      <div className="scroller">
        <div className="progress-bar">
          <span className="current-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="audio-progress"
            min="0"
            max="100"
            value={isNaN(progress) ? 0 : progress}
            onChange={(e) => onScrub(e.target.value)}
          />
          <span className="total-time">{formatTime(audioLength)}</span>
        </div>

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
        <button
          className={`icon-button ${shuffle ? "active" : ""}`}
          onClick={() => setShuffle(!shuffle)}
        >
          <FontAwesomeIcon icon={faShuffle} />
        </button>
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
        <button
          className={`icon-button ${repeat ? "active" : ""}`}
          onClick={() => setRepeat(!repeat)}
        >
          <FontAwesomeIcon icon={faRepeat} />
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
