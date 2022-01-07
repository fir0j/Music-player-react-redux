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

function Player() {
  const url = useSelector(selectUrl);
  const trackIndex = useSelector(selectTrackIndex);
  const playing = useSelector(selectPlaying);
  const localfiles = useSelector(selectLocalfiles);
  const dispatch = useDispatch();
  console.log("playing Track", trackIndex);

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

  return (
    <div style={{ width: "56.25%" }}>
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        playing={playing}
        onEnded={(e) => playNext(e, 1)}
        onStart={startPlaying}
      />
    </div>
  );
}

export default Player;
