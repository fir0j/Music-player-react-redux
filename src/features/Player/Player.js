import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUrl,
  selectPlaying,
  selectLocalfiles,
  selectTrackIndex,
  selectFilesInfo,
  selectHovering,
  selectLoop,
  setPlaying,
  setUrl,
  setTrackIndex,
  setFilesInfo,
  setLocalfiles,
  setHovering,
  setLoop,
} from "./playerSlice";
import { STabs, STabList, STab, STabPanel } from "../../components/Tabs";
import { ControlButton, UploadButton } from "../../components/Button";
import ListItem from "../../components/ListItem";
import Search from "../../components/Search";
import "../Player/style.css";

function Player() {
  const url = useSelector(selectUrl);
  const trackIndex = useSelector(selectTrackIndex);
  const playing = useSelector(selectPlaying);
  const localfiles = useSelector(selectLocalfiles);
  const filesInfo = useSelector(selectFilesInfo);
  const hovering = useSelector(selectHovering);
  const loop = useSelector(selectLoop);
  const dispatch = useDispatch();
  const urlRef = useRef("");

  const startPlaying = () => {
    dispatch(setPlaying(true));
  };

  const handleNext = (e, nextBy) => {
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

  const handleLoop = () => dispatch(setLoop(!loop));

  const handleUrl = () => {
    if (!url) return null;
    if (typeof url === "object") return url.url;
    if (typeof url === "string") return url;
  };

  const handleMediaInput = (event) => {
    if (event.target.files.length === 0) return;
    let filesInfo = [];
    let files = Array.from(event.target.files).map((item, i) => {
      filesInfo.push({
        id: `${item.name}${item.size}${i}`,
        name: item.name,
        type: item.type,
        size: item.size,
      });

      return {
        id: `${item.name}${item.size}${i}`,
        url: URL.createObjectURL(item),
      };
    });

    dispatch(setFilesInfo(filesInfo));
    dispatch(setLocalfiles(files));
    dispatch(setUrl(files[0]));
  };

  const playMe = (e, item) => {
    let itemWithUrl = localfiles.filter((el) => el.id === item.id)[0];
    dispatch(setPlaying(false));
    dispatch(setUrl(itemWithUrl));
    dispatch(setPlaying(true));
  };

  const handlePlayUrl = (e) => {
    e.preventDefault();
    dispatch(setPlaying(false));
    dispatch(setUrl(urlRef.current));
    dispatch(setPlaying(true));
  };

  let audioFormats = ["audio/mpeg"];
  let videoFormats = ["video/mp4"];
  const videosList =
    filesInfo &&
    filesInfo
      .filter((list) => videoFormats.includes(list.type))
      .map((item, i) => (
        <ListItem key={item.name} onClick={(e) => playMe(e, item)}>
          <span>{`${i + 1}. `}</span>
          {item.name}
        </ListItem>
      ));

  const musicsList =
    filesInfo &&
    filesInfo
      .filter((list) => audioFormats.includes(list.type))
      .map((item, i) => (
        <ListItem key={item.name} onClick={(e) => playMe(e, item)}>
          <span>{`${i + 1}. `}</span>
          {item.name}
        </ListItem>
      ));

  const upload = (
    <UploadButton>
      <label
        style={{
          display: "inline-block",
          height: "100%",
          width: "100%",
          borderRadius: "50%",
          cursor: "pointer",
          textAlign: "center",
        }}
        htmlFor="file-upload"
      >
        +
      </label>
      <input
        id="file-upload"
        type="file"
        multiple
        onChange={handleMediaInput}
        style={{ display: "none" }}
      />
    </UploadButton>
  );
  const playOnlineUrl = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <form
        onSubmit={handlePlayUrl}
        style={{
          maxHeight: "30px",
          width: "80%",
          margin: 8,
        }}
      >
        <input
          style={{
            borderRadius: "4px",
            display: "inline-block",
            color: "grey",
            fontSize: "1em",
            border: "1px solid",
            width: "100%",
            padding: "4px",
            paddingLeft: "4px",
            paddingRight: "48px",
            maxWidth: "1080px",
            // outline: "1px solid red",
          }}
          placeholder="e.g https://www.youtube.com/watch?v=g8LEktKv9hs"
          onChange={(e) => (urlRef.current = e.target.value)}
        />
        <button
          style={{
            height: "32px",
            display: "inline-block",
            margin: 0,
            padding: 8,
            borderRadius: 0,
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
            backgroundColor: "black",
            color: "yellow",
            cursor: "pointer",
            position: "absolute",
            marginLeft: -46,
          }}
        >
          Play
        </button>
      </form>
    </div>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "1080px",
          backgroundColor: "rgb(62, 57, 36)",
          padding: "20px 40px 20px 40px",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignContent: "center",
            backgroundColor: "rgb(51, 45, 25)",
            padding: "16px 8px",
            marginBottom: "8px",
            borderRadius: "4px",
          }}
        >
          <Search />
          <div
            style={{
              color: "rgb(252, 228, 148)",
              fontSize: "2rem",
              fontWeight: "bolder",
              fontFamily: "cursive",
            }}
          >
            Smart Media Player
          </div>
        </div>
        <div
          style={{
            border: "2px solid ",
            borderBottom: "30px solid ",
            borderTop: "20px solid ",
            borderRadius: "30px",
            borderColor: "rgb(51, 45, 25)",
            position: "relative",
            width: "100%",
            minHeight: "600px",
          }}
          onMouseOver={() => {
            if (!hovering) dispatch(setHovering(true));
          }}
          onMouseLeave={() => {
            if (hovering) dispatch(setHovering(false));
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 16,
              bottom: 45,
              right: 16,
              backgroundColor: "transparent",
              //   backgroundColor: "green",
              display: hovering ? "flex" : "none",
              justifyContent: "space-between",
              fontSize: "1.8em",
              color: "rgb(252, 228, 148)",
            }}
          >
            <ControlButton
              style={{
                border: "1px solid rgb(252, 228, 148)",
                color: "rgb(252, 228, 148)",
                background: "none",
                fontSize: "1.5rem",
                borderRadius: "4px",
                cursor: "pointer",
                padding: "4px 8px",
                fontFamily: "cursive",
                fontWeight: "bold",
              }}
              onClick={(e) => handleNext(e, -1)}
            >
              Prev
            </ControlButton>
            <ControlButton className="control-button" onClick={handleLoop}>
              loop
            </ControlButton>
            <ControlButton onClick={(e) => handleNext(e, 1)}>
              Next
            </ControlButton>
          </div>
          <ReactPlayer
            className="react-player"
            url={handleUrl()}
            width="100%"
            height="100%"
            controls
            playing={playing}
            onEnded={(e) => handleNext(e, 1)}
            onStart={startPlaying}
            loop={loop}
          />
        </div>
        <div
          style={{
            backgroundColor: "rgb(51, 45, 25)",
            marginTop: "8px",
            paddingBottom: "8px",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <STabs
            selectedTabClassName="is-selected"
            selectedTabPanelClassName="is-selected"
          >
            <STabList>
              <STab>Videos</STab>
              <STab>Musics</STab>
              <STab>Online</STab>
            </STabList>

            <STabPanel>
              <ul>{videosList}</ul>
              {upload}
            </STabPanel>
            <STabPanel>
              <ul>{musicsList}</ul>
              {upload}
            </STabPanel>
            <STabPanel>{playOnlineUrl}</STabPanel>
          </STabs>
        </div>
      </div>
    </div>
  );
}

export default Player;
