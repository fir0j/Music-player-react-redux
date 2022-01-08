import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  url: null,
  playing: false,
  trackIndex: 0,
  localfiles: null,
  filesInfo: [],
  hovering: false,
  loop: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUrl: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.url = action.payload;
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setLocalfiles: (state, action) => {
      state.localfiles = action.payload;
    },
    setFilesInfo: (state, action) => {
      state.filesInfo = action.payload;
    },
    setTrackIndex: (state, action) => {
      let isNextAllowed =
        state.trackIndex + action.payload < state.localfiles.length;
      if (isNextAllowed) state.trackIndex = state.trackIndex + action.payload;
    },
    setHovering: (state, action) => {
      state.hovering = action.payload;
    },
    setLoop: (state, action) => {
      state.loop = action.payload;
    },
  },
});

// 3 types of exports

// exporting our reducer functions
export const {
  setUrl,
  setPlaying,
  setLocalfiles,
  setFilesInfo,
  setTrackIndex,
  setHovering,
  setLoop,
} = playerSlice.actions;

// exporting our callbacks for useSelector, is used to access redux store from anywhere in app
export const selectUrl = (state) => state.player.url; // syntax state.configureStoreName.stateName
export const selectPlaying = (state) => state.player.playing;
export const selectLocalfiles = (state) => state.player.localfiles;
export const selectFilesInfo = (state) => state.player.filesInfo;
export const selectTrackIndex = (state) => state.player.trackIndex;
export const selectHovering = (state) => state.player.hovering;
export const selectLoop = (state) => state.player.loop;

export default playerSlice.reducer;
