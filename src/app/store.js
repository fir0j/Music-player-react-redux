import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "../features/Player/playerSlice";

export const store = configureStore({
  reducer: {
    player: playerSlice,
  },
});
