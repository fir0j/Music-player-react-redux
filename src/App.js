import React, { useRef } from "react";
import "./App.css";
import Player from "./features/Player/Player";
import { useDispatch, useSelector } from "react-redux";
import {
  setUrl,
  setLocalfiles,
  setFilesInfo,
  setPlaying,
  selectLocalfiles,
  selectFilesInfo,
  selectPlaying,
} from "./features/Player/playerSlice";
import { UploadButton } from "./components/Button";
import styled from "styled-components";
import { STabs, STabList, STab, STabPanel } from "./components/Tabs";
// let youtubeUrl = "https://www.youtube.com/watch?v=g8LEktKv9hs";

const Div = styled.div`
  border: 1px solid;
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: rgb(254, 249, 228);
  padding-top: 8px;
  border-radius: 8px;
  height: auto;
`;
const Layout = (props) => <Div {...props} children={props.children} />;

const Search = styled.input.attrs((props) => ({
  // we can define static props
  type: "text",
  placeholder: "Search...",

  // or we can define dynamic ones
  size: props.size || "0.5rem",
}))`
  color: grey;
  font-size: 1em;
  border: 1px solid;
  border-radius: 20px;
  width: 100%;
  padding: 4px;
  padding-left: 1rem;
  width: 720px;
`;

const PlayUrl = styled(Search).attrs((props) => ({
  placeholder: "url...",
}))`
  border-radius: 0px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  display: inline-block;
  padding-right: 35px;
`;

const ListItem = styled.li`
  color: black;
  list-style-type: none;
  padding: 10px 4px;
  background-color: rgb(252, 228, 148);
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
  }
`;

function App() {
  const filesInfo = useSelector(selectFilesInfo);
  const localfiles = useSelector(selectLocalfiles);
  const dispatch = useDispatch();
  const urlRef = useRef("");

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

  return (
    <div className="App">
      <main>
        <Layout>
          <div>
            <li>
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
              </ul>
              rgb(52, 43, 12)
            </li>
          </div>
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
                justifyContent: "flex-start",
                alignContent: "center",
                paddingBottom: "8px",
                backgroundColor: "rgb(51, 45, 25)",
                paddingTop: "8px",
                padding: "8px",
                marginBottom: "8px",
                borderRadius: "4px",
              }}
            >
              <Search />
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
            >
              <Player />
              {/* <iframe
                id="ytplayer"
                title="youtube player"
                type="text/html"
                width="1080"
                height="607"
                src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
                frameborder="0"
              /> */}
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
                <STabPanel>
                  <form
                    onSubmit={handlePlayUrl}
                    style={{ maxHeight: "30px", margin: 8 }}
                  >
                    <PlayUrl
                      onChange={(e) => (urlRef.current = e.target.value)}
                    />
                    <button
                      style={{
                        height: "32px",
                        display: "inline-block",
                        margin: 0,
                        padding: 8,
                        borderRadius: 0,
                        backgroundColor: "black",
                        color: "yellow",
                        cursor: "pointer",
                      }}
                    >
                      Play
                    </button>
                  </form>
                </STabPanel>
              </STabs>
            </div>
            <div>list</div>
          </div>
          <div style={{ position: "absolute", top: 8, right: 0 }}>Avatar</div>
          <div style={{ marginTop: "32px", outline: "1px solid" }}>
            Playlist
          </div>
        </Layout>
      </main>
    </div>
  );
}

export default App;
