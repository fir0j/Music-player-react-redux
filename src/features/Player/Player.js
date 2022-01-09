import React, { useState, useRef } from "react";
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
  const sampleAccordionData = [
    {
      title: "Item 1",
      content:
        "Lorem ipsum dolor amet gastropub church-key gentrify actually tacos. Vegan taxidermy freegan before they sold out kickstarter copper mug iceland selvage blog prism. 8-bit vice drinking vinegar stumptown locavore. Microdosing unicorn typewriter sartorial cornhole. Man bun venmo cronut wolf shaman offal truffaut. Chillwave vinyl pug distillery adaptogen man bun tofu retro hammock kogi tbh jean shorts organic. Craft beer vinyl etsy, portland microdosing chicharrones lumbersexual crucifix cronut gentrify four loko tousled fingerstache.",
    },
    {
      title: "Item 2",
      content:
        "Slow-carb knausgaard health goth kombucha tousled four loko. Messenger bag cronut +1, four loko williamsburg you probably haven't heard of them bicycle rights taiyaki ramps squid vaporware. Green juice typewriter master cleanse distillery viral wayfarers asymmetrical quinoa health goth semiotics succulents kinfolk pork belly shaman. Cronut salvia farm-to-table kickstarter shaman cloud bread echo park.",
    },
    {
      title: "Item 3",
      content:
        "Health goth humblebrag live-edge meggings pork belly actually ugh kombucha banh mi plaid etsy waistcoat. Hammock celiac crucifix tousled, dreamcatcher tbh truffaut direct trade cliche synth hot chicken palo santo pork belly man bun retro. Art party +1 live-edge occupy iceland selfies beard fanny pack godard 90's messenger bag. Bushwick irony umami woke. Kale chips raw denim austin, food truck flexitarian 90's deep v. Locavore green juice cold-pressed hexagon copper mug vegan sriracha man bun la croix photo booth forage. Succulents migas irony hella mumblecore keytar waistcoat aesthetic cornhole shabby chic tumblr semiotics readymade.",
    },
    {
      title: "Item 4",
      content:
        "Tbh next level subway tile ennui cloud bread. Master cleanse vaporware food truck, authentic distillery meggings ugh activated charcoal iceland gastropub fam. Raw denim direct trade pinterest keytar fam echo park wolf four dollar toast glossier kitsch taiyaki 8-bit austin. Brunch pinterest raw denim banh mi, bushwick organic artisan synth poutine man bun scenester. Occupy chartreuse food truck banh mi affogato shaman.",
    },
    {
      title: "Item 5",
      content:
        "Aesthetic tofu dreamcatcher lumbersexual jianbing poke PBR&B kogi heirloom. Sartorial artisan synth tacos vegan bushwick, lomo thundercats VHS disrupt bespoke scenester. Copper mug taiyaki occupy, coloring book drinking vinegar taxidermy direct trade intelligentsia quinoa raw denim succulents. Dreamcatcher copper mug fanny pack yuccie art party hoodie, ugh portland.",
    },
    {
      title: "Item 6",
      content: "Oh. You need a little dummy text for your mockup? How quaint.",
    },
  ];

  const AccordionItems = ({
    accordionContent,
    refs,
    currentAccordion,
    setCurrentAccordion,
    setBodyHeight,
    bodyHeight,
  }) =>
    accordionContent.map(({ title, content }, i) => (
      <AccordionItem key={`accordion-item-${i}`}>
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
          {title}
        </AccordionTitle>

        <AccordionBody active={currentAccordion === i} bodyHeight={bodyHeight}>
          <AccordionContent ref={refs[i]}>
            <ListItem>{content}</ListItem>
          </AccordionContent>
        </AccordionBody>
      </AccordionItem>
    ));
  //accordion end

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

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="second-inner-wrapper"
        style={{
          width: "100%",
          maxWidth: "1080px",
          backgroundColor: "rgb(62, 57, 36)",
          borderRadius: "4px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
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
      <div
        style={{
          backgroundColor: "rgb(62, 57, 36)",
          borderRadius: "4px",
          marginLeft: "4px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignContent: "center",
            backgroundColor: "rgb(51, 45, 25)",
            borderRadius: "4px",
            padding: "8px 8px",
            paddingBottom: "16px",
            margin: "20px",
          }}
        >
          <div
            style={{
              color: "rgb(252, 228, 148)",
              fontSize: "1.5rem",
              fontWeight: "bolder",
              paddingLeft: "4px",
              paddingRight: "4px",
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
                        accordionContent={sampleAccordionData}
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
    </div>
  );
}

export default Player;
