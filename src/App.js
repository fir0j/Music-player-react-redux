import React from "react";
import "./App.css";
import Player from "./features/Player/Player";
import { useDispatch } from "react-redux";
import {
  setUrl,
  setLocalfiles,
  setFilesInfo,
} from "./features/Player/playerSlice";
// import { StyledButton, TomatoButton, DynamicButton } from "./components/Button";
// let youtubeUrl = "https://www.youtube.com/watch?v=g8LEktKv9hs";

function App() {
  const dispatch = useDispatch();

  const handleMediaInput = (event) => {
    if (event.target.files.length === 0) return;
    let filesInfo = [];
    let files = Array.from(event.target.files).map((item) => {
      filesInfo.push({ name: item.name, type: item.type, size: item.size });
      return URL.createObjectURL(item);
    });

    dispatch(setFilesInfo(filesInfo));
    dispatch(setLocalfiles(files));
    dispatch(setUrl(files[0]));
  };

  return (
    <div className="App">
      <main>
        <input type="file" multiple onChange={handleMediaInput} />
        <Player />
      </main>
    </div>
  );
}

export default App;
