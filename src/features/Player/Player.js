import React, { useState, useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUrl,
  selectPlaying,
  selectTrackIndex,
  selectFiles,
  selectHovering,
  selectLoop,
  selectPlaylist,
  selectModalStatus,
  selectItemClicked,
  setPlaying,
  setUrl,
  setTrackIndex,
  setFiles,
  setHovering,
  setLoop,
  setPlaylist,
  setModalStatus,
  setItemClicked,
  setActivePlaylist,
  removeFromPlaylist,
} from "./playerSlice";
import { STabs, STabList, STab, STabPanel } from "../../components/Tabs";
import {
  ControlButton,
  PlayButton,
  UploadButton,
} from "../../components/Button";
import ListItem from "../../components/ListItem";
import Search from "../../components/Search";
import "../Player/style.css";
import {
  Container,
  Section,
  InnerSection,
  AccordionContainer,
  AccordionInner,
  AccordionItem,
  AccordionTitle,
  AccordionBody,
  AccordionContent,
} from "../../components/Accordion";
// import AddToPlaylistIcon from "../Player/icons/add-playlist.svg";
import { ReactComponent as AddToPlaylistIcon } from "../Player/icons/add-playlist.svg";
import { ReactComponent as RemoveFromPlaylistIcon } from "../Player/icons/remove-playlist.svg";
import { ReactComponent as ArrowDownIcon } from "../Player/icons/arrow-down.svg";
import Modal from "react-modal";
Modal.setAppElement("#root");

function Player() {
  const url = useSelector(selectUrl);
  const trackIndex = useSelector(selectTrackIndex);
  const playing = useSelector(selectPlaying);
  const files = useSelector(selectFiles);
  const hovering = useSelector(selectHovering);
  const loop = useSelector(selectLoop);
  const playlist = useSelector(selectPlaylist);
  const modalStatus = useSelector(selectModalStatus);
  const itemClicked = useSelector(selectItemClicked);
  const dispatch = useDispatch();
  const urlRef = useRef("");
  const modalRef = useRef("");
  const audioFormats = ["audio/mpeg"];
  const videoFormats = ["video/mp4"];

  function openModal() {
    dispatch(setModalStatus(true));
  }

  function closeModal() {
    dispatch(setModalStatus(false));
  }

  const startPlaying = () => {
    dispatch(setPlaying(true));
  };

  // onPlayEnded or onManualNext
  const handleNext = (e, nextBy) => {
    dispatch(setPlaying(false));
    console.log(trackIndex, nextBy, files.length);
    let isNextAllowed = trackIndex + nextBy < files.length;
    if (isNextAllowed) {
      dispatch(setTrackIndex(nextBy));
      // since above dispatched is not reflected yet, nextTrack will be trackIndex+nextBy
      dispatch(setUrl(files[trackIndex + nextBy]));
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

    let files = Array.from(event.target.files).map((item, i) => {
      return {
        id: `${item.name}${item.size}${i}`,
        name: item.name,
        type: item.type,
        size: item.size,
        url: URL.createObjectURL(item),
      };
    });

    dispatch(setFiles(files));
    dispatch(setUrl(files[0]));
  };

  const playMe = (e, item) => {
    dispatch(setItemClicked(item));
    dispatch(setPlaying(false));
    dispatch(setUrl(item));
    dispatch(setPlaying(true));
    dispatch(setActivePlaylist({}));
  };

  const handlePlayUrl = (e) => {
    e.preventDefault();
    dispatch(setPlaying(false));
    dispatch(setUrl(urlRef.current));
    dispatch(setPlaying(true));
  };

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    // saving memory at expense of compute and time.
    let playlistItem = { name: modalRef.current, id: itemClicked.id };
    dispatch(setPlaylist(playlistItem));
    dispatch(setModalStatus(false));
  };

  const handleRemoveFromPlaylist = (playlistName, playlistItemId) => {
    console.log(playlistName, playlistItemId);
    dispatch(removeFromPlaylist({ playlistName, playlistItemId }));
  };
  console.log("playlist", playlist);

  // accordion start
  const [currentAccordion, setCurrentAccordion] = useState(0);
  const [bodyHeight, setBodyHeight] = useState(0);

  const item0 = useRef(null);
  const item1 = useRef(null);
  const item2 = useRef(null);
  const item3 = useRef(null);
  const item4 = useRef(null);
  const item5 = useRef(null);

  const refs = [item0, item1, item2, item3, item4, item5];
  // Accordion
  const AccordionItems = ({
    accordionContent,
    refs,
    currentAccordion,
    setCurrentAccordion,
    setBodyHeight,
    bodyHeight,
  }) =>
    accordionContent.map((item, i) => (
      <AccordionItem key={`accordion-item-${Date.now()}}${item.name}`}>
        <AccordionTitle
          onClick={() => {
            if (currentAccordion === i) {
              setCurrentAccordion(null);
              return;
            }
            setCurrentAccordion(i);
            setBodyHeight(refs[i].current.clientHeight);
          }}
        >
          {item.name}
          <ArrowDownIcon
            style={{ marginLeft: "8px", verticalAlign: "middle" }}
            height="20px"
            width="20px"
            fill={
              itemClicked.id === item.id
                ? "rgb(62, 57, 36)"
                : "rgb(252, 228, 148)"
            }
          />
        </AccordionTitle>

        <AccordionBody active={currentAccordion === i} bodyHeight={bodyHeight}>
          <AccordionContent ref={refs[i]}>
            {files.map(
              (file, i) =>
                item.list.includes(file.id) && (
                  <ListItem
                    key={`${file.id}${i}`}
                    style={{ marginTop: "8px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      playMe(e, file);
                    }}
                  >
                    <button
                      style={{
                        display: "inline-block",
                        // marginLeft: "30px",
                        marginRight: "8px",
                        background: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        verticalAlign: "middle",
                        borderColor: "rgb(252, 228, 148)",
                      }}
                    >
                      <RemoveFromPlaylistIcon
                        onClick={(e) => {
                          console.log("active item", item);
                          e.stopPropagation();
                          handleRemoveFromPlaylist(item.name, file.id);
                        }}
                        fill={
                          itemClicked.id === item.id
                            ? "rgb(62, 57, 36)"
                            : "rgb(252, 228, 148)"
                        }
                      />
                    </button>
                    {file.name}
                  </ListItem>
                )
            )}
          </AccordionContent>
        </AccordionBody>
      </AccordionItem>
    ));
  //accordion end

  const videosList = useMemo(
    () =>
      files &&
      files
        .filter((list) => videoFormats.includes(list.type))
        .map((item, i) => (
          <ListItem
            key={item.name}
            style={{
              color: itemClicked.id === item.id ? "rgb(62, 57, 36)" : "",
              backgroundColor:
                itemClicked.id === item.id ? "rgb(252, 228, 148)" : "",
            }}
            onClick={(e) => playMe(e, item)}
          >
            <span>{`${i + 1}. `}</span>
            {item.name}
            <button
              style={{
                display: "inline-block",
                marginLeft: "30px",
                background: "none",
                borderRadius: "4px",
                cursor: "pointer",
                verticalAlign: "middle",
                borderColor: "rgb(252, 228, 148)",
              }}
            >
              <AddToPlaylistIcon
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                  dispatch(setModalStatus(true));
                  dispatch(setItemClicked(item));
                  dispatch(setActivePlaylist({}));
                }}
                fill={
                  itemClicked.id === item.id
                    ? "rgb(62, 57, 36)"
                    : "rgb(252, 228, 148)"
                }
              />
            </button>
          </ListItem>
        )),
    [files.length, itemClicked]
  );

  // console.log("item clicked is", itemClicked);
  // console.log("item clicked is", files);

  const musicsList = useMemo(
    () =>
      files &&
      files
        .filter((list) => audioFormats.includes(list.type))
        .map((item, i) => (
          <ListItem
            style={{
              color: itemClicked.id === item.id ? "rgb(62, 57, 36)" : "",
              backgroundColor:
                itemClicked.id === item.id ? "rgb(252, 228, 148)" : "",
            }}
            key={item.name}
            onClick={(e) => playMe(e, item)}
          >
            <span>{`${i + 1}. `}</span>
            {item.name}
            <button
              style={{
                display: "inline-block",
                marginLeft: "30px",
                background: "none",
                borderRadius: "4px",
                cursor: "pointer",
                verticalAlign: "middle",
                borderColor: "rgb(252, 228, 148)",
              }}
            >
              <AddToPlaylistIcon
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                  dispatch(setModalStatus(true));
                  dispatch(setItemClicked(item));
                  dispatch(setActivePlaylist({}));
                }}
                fill={
                  itemClicked.id === item.id
                    ? "rgb(62, 57, 36)"
                    : "rgb(252, 228, 148)"
                }
              />
            </button>
          </ListItem>
        )),
    [files.length, itemClicked]
  );

  const ModalOveray = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",
        width: "100%",
        height: "100%",
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: "relative",
          fontFamily: "cursive",
          fontSize: "1.5rem",
          // width: "100%",
          weight: 500,
          backgroundColor: "rgb(252, 228, 148)",
          color: "rgb(51, 45, 25)",
          padding: 20,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <fieldset>
          <legend
            style={{
              fontWeight: "bold",
            }}
          >
            Make your choice
          </legend>
          <form
            style={{
              textAlign: "left",
            }}
          >
            <div>
              <label>Add to existing playlist</label>
              <br />
              <select
                onChange={(e) => (modalRef.current = e.target.value)}
                style={{
                  height: "40px",
                  width: "200px",
                  backgroundColor: "rgb(254, 249, 228)",
                  color: "rgb(52, 43, 12)",
                  marginRight: "50px",
                }}
              >
                <option value={null}>Availabe playlists</option>
                {playlist.length &&
                  playlist.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <PlayButton onClick={handleAddToPlaylist}>Add</PlayButton>
            </div>
            <div style={{ marginTop: "16px" }}>
              <label>Create new playlist and add</label>
              <br />
              <input
                className="play-button"
                style={{
                  borderRadius: "4px",
                  display: "inline-block",
                  color: "rgb(52, 43, 12)",
                  fontSize: "1rem",
                  width: "100%",
                  padding: "4px",
                  paddingLeft: "8px",
                  paddingRight: "95px",
                  maxWidth: "1080px",
                  minHeight: "40px",
                  backgroundColor: "rgb(254, 249, 228)",
                }}
                placeholder="Enter name for new playlist"
                onChange={(e) => (modalRef.current = e.target.value)}
              />
              <PlayButton
                onClick={handleAddToPlaylist}
                style={{ marginLeft: "-90px" }}
              >
                Add to new
              </PlayButton>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );

  const upload = (
    <UploadButton>
      <label
        style={{
          display: "inline-block",
          cursor: "pointer",
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
          className="play-button"
          style={{
            borderRadius: "4px",
            display: "inline-block",
            color: "rgb(52, 43, 12)",
            fontSize: "1em",
            width: "100%",
            padding: "4px",
            paddingLeft: "8px",
            paddingRight: "52px",
            maxWidth: "1080px",
            minHeight: "40px",
            backgroundColor: "rgb(254, 249, 228)",
          }}
          placeholder="e.g https://www.youtube.com/watch?v=g8LEktKv9hs"
          onChange={(e) => (urlRef.current = e.target.value)}
        />
        <PlayButton>Play</PlayButton>
      </form>
    </div>
  );

  const Playlists = () =>
    playlist.length > 0 && (
      <div
        className="modal-outermost-wrapper"
        style={{
          backgroundColor: "rgb(62, 57, 36)",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              color: "rgb(252, 228, 148)",
              fontSize: "1.5rem",
              fontWeight: "bolder",
              paddingTop: "4px",
              textAlign: "center",
            }}
          >
            My Playlists
          </div>
          <ul style={{ padding: 0 }}>
            <Container>
              <Section>
                <InnerSection>
                  <AccordionContainer>
                    <AccordionInner>
                      <AccordionItems
                        accordionContent={playlist}
                        refs={refs}
                        currentAccordion={currentAccordion}
                        setCurrentAccordion={setCurrentAccordion}
                        setBodyHeight={setBodyHeight}
                        bodyHeight={bodyHeight}
                      />
                    </AccordionInner>
                  </AccordionContainer>
                </InnerSection>
              </Section>
            </Container>
          </ul>
        </div>
      </div>
    );

  return (
    <div className="smart-player-top-wrapper">
      <div
        className="second-inner-wrapper"
        style={{
          width: "100%",
          maxWidth: "1080px",
          backgroundColor: "rgb(62, 57, 36)",
        }}
      >
        <div
          style={{
            display: "block",
            justifyContent: "space-around",
            alignContent: "center",
            backgroundColor: "rgb(51, 45, 25)",
            borderRadius: "4px",
            padding: "8px 8px",
            paddingBottom: "16px",
            marginBottom: "8px",
          }}
        >
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
          <Search />
        </div>
        <div
          className="player-wrapper"
          style={{
            border: "2px solid ",
            borderBottom: "30px solid ",
            borderTop: "20px solid ",
            borderRadius: "30px",
            borderColor: "rgb(51, 45, 25)",
            position: "relative",
            width: "100%",
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
            <ControlButton onClick={(e) => handleNext(e, -1)}>
              Prev
            </ControlButton>
            <ControlButton
              className="loop-button"
              style={{
                color: loop ? "rgb(62, 57, 36)" : "",
                backgroundColor: loop ? "rgb(252, 228, 148)" : "",
              }}
              onClick={handleLoop}
            >
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
      <Playlists />
      <Modal
        isOpen={modalStatus}
        onRequestClose={closeModal}
        style={{
          content: {
            background: "rgb(52, 43, 12)",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Add to playlist Modal"
      >
        <ModalOveray />
      </Modal>
    </div>
  );
}

export default Player;
