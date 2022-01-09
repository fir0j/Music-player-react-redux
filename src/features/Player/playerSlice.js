import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  url: null,
  playing: false,
  trackIndex: 0,
  files: [],
  hovering: false,
  loop: false,
  playlist: [],
  modalStatus: false,
  itemClicked: {},
  activePlaylist: {},
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
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setTrackIndex: (state, action) => {
      let isNextAllowed =
        state.trackIndex + action.payload < state.files.length;
      if (isNextAllowed) state.trackIndex = state.trackIndex + action.payload;
    },
    setHovering: (state, action) => {
      state.hovering = action.payload;
    },
    setLoop: (state, action) => {
      state.loop = action.payload;
    },
    setPlaylist: (state, action) => {
      // expecting action.payload = {name:'Favourites',id:'id1'}

      // creating first playlist
      if (!state.playlist.length) {
        state.playlist.push({
          name: action.payload.name,
          list: [action.payload.id],
        });
        return;
      }

      // if some playlist already exists
      if (state.playlist.length) {
        const booleanResults = state.playlist.map((item) => {
          if (item.name === action.payload.name) {
            // adding to existing playlist
            item.list.push(action.payload.id);
            return true;
          }
          return false;
        });
        // if new playlist
        if (!booleanResults.includes(true)) {
          state.playlist.push({
            name: action.payload.name,
            list: [action.payload.id],
          });
        }
      }
    },
    removeFromPlaylist: (state, action) => {
      state.playlist.forEach((el) => {
        if (el.name === action.payload.playlistName) {
          // remove item.id from the list
          let newList = el.list.filter(
            (id) => id !== action.payload.playlistItemId
          );
          console.log("newlist is", newList);
          state.playlist = { ...state.playlist, list: newList };
        }
      });
    },
    setModalStatus: (state, action) => {
      state.modalStatus = action.payload;
    },
    setItemClicked: (state, action) => {
      state.itemClicked = action.payload;
    },
    setActivePlaylist: (state, action) => {
      state.activePlaylist = action.payload;
    },
  },
});

// 3 types of exports

// exporting our reducer functions
export const {
  setUrl,
  setPlaying,
  setFiles,
  setTrackIndex,
  setHovering,
  setLoop,
  setPlaylist,
  setModalStatus,
  setItemClicked,
  setActivePlaylist,
  removeFromPlaylist,
} = playerSlice.actions;

// exporting our callbacks for useSelector, is used to access redux store from anywhere in app
export const selectUrl = (state) => state.player.url; // syntax state.configureStoreName.stateName
export const selectPlaying = (state) => state.player.playing;
export const selectFiles = (state) => state.player.files;
export const selectTrackIndex = (state) => state.player.trackIndex;
export const selectHovering = (state) => state.player.hovering;
export const selectLoop = (state) => state.player.loop;
export const selectPlaylist = (state) => state.player.playlist;
export const selectModalStatus = (state) => state.player.modalStatus;
export const selectItemClicked = (state) => state.player.itemClicked;
export const selectActivePlaylist = (state) => state.player.activePlaylist;

export default playerSlice.reducer;
