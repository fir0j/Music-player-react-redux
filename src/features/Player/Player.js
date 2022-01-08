import React from "react";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUrl,
  selectPlaying,
  selectLocalfiles,
  selectTrackIndex,
  setPlaying,
  setUrl,
  setTrackIndex,
} from "./playerSlice";
import "../Player/react-player.css";

function Player() {
  const url = useSelector(selectUrl);
  const trackIndex = useSelector(selectTrackIndex);
  const playing = useSelector(selectPlaying);
  const localfiles = useSelector(selectLocalfiles);
  const dispatch = useDispatch();
  console.log("playing Track", trackIndex);
  console.log("url", url);

  const startPlaying = () => {
    console.log("startedPlaying");
    dispatch(setPlaying(true));
  };

  const playNext = (e, nextBy) => {
    dispatch(setPlaying(false));
    console.log(trackIndex, nextBy, localfiles.length);
    let isNextAllowed = trackIndex + nextBy < localfiles.length;
    if (isNextAllowed) {
      dispatch(setTrackIndex(nextBy));
      // since above dispatched is not reflected yet, nextTrack will be trackIndex+nextBy
      dispatch(setUrl(localfiles[trackIndex + nextBy]));
      dispatch(setPlaying(true));
    }
  };

  const handleUrl = () => {
    if (!url) return null;
    if (typeof url === "object") return url.url;
    if (typeof url === "string") return url;
  };

  return (
    <ReactPlayer
      className="react-player"
      url={handleUrl()}
      width="100%"
      height="100%"
      controls
      playing={playing}
      onEnded={(e) => playNext(e, 1)}
      onStart={startPlaying}
    />
  );
}

export default Player;
