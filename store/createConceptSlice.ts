import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConceptState {
  images: string[];
  thumbnail: string | null;
  details: {
    title: string;
    description: string;
    style: string;
    price: number;
    roomType: string;
  } | null;
}

// Define the initial state for the 'concept' slice
const initialState: ConceptState = {
  images: [],
  thumbnail: null,
  details: null,
};

const conceptCreationSlice = createSlice({
  name: "conceptCreation", // The name of the slice, used in action type names
  initialState,
  reducers: {
    // Define a reducer function to set images in the state
    setImages(state, action: PayloadAction<string[]>) {
      state.images = action.payload;
    },
    // Define a reducer function to set the selected thumbnail
    setThumbnail(state, action: PayloadAction<string>) {
      state.thumbnail = action.payload;
    },
    // Define a reducer function to set the concept details
    setDetails: (state, action: PayloadAction<ConceptState["details"]>) => {
      state.details = action.payload;
    },
  },
});

// Export the action creator generated by createSlice
export const { setImages, setThumbnail, setDetails } =
  conceptCreationSlice.actions;

// Export the reducer generated by createSlice
export default conceptCreationSlice.reducer;
