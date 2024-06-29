import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LocationStore {
  id: number;
  display_name: string;
}

interface LocationState {
  location: LocationStore
}

const initialState: LocationState = {
  location: {
    id: (localStorage.getItem("locationId") ?
      Number(localStorage.getItem("locationId")) :
      0),
    display_name: localStorage.getItem("locationCachedDisplayName") || "n/a"
  }
}

const LocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<LocationStore>) {
      state.location = action.payload;
    }
  }
});

export const { setLocation } = LocationSlice.actions;

export default LocationSlice.reducer;