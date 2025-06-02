import { v4 as uuidv4 } from "uuid";
import { Song } from "../types/song";

const chillHop = (): Song[] => {
  return [
    {
      name: "EONA",
      cover:
        "/assets/img/eona.webp",
      artist: "Rockot",
      audio: "/assets/music/eona-emotional-ambient-pop-351436.mp3",
      color: ["#205950", "#2ab3bf"],
      id: uuidv4(),
      active: true,
    },
    {
      name: "Jungle Waves",
      cover:
        "/assets/img/jungle_waves.jpg",
      artist: "DIMMYSAD",
      audio: "/assets/music/jungle-waves.mp3",
      color: ["#EF8EA9", "#ab417f"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Brain Implant",
      cover:
        "/assets/img/brain-implant.jpg",
      artist: "soundbay",
      audio: "/assets/music/brain-implant.mp3",
      color: ["#EF8EA9", "#ab417f"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Alone",
      cover:
        "/assets/img/alone.webp",
      artist: "BoDleasons",
      audio: "/assets/music/alone.mp3",
      color: ["#EF8EA9", "#ab417f"],
      id: uuidv4(),
      active: false,
    }
  ];
};
export default chillHop;
