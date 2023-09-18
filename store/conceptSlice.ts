import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConceptState {
  images: string[];
}

// Define the initial state for the 'concept' slice
const initialState: ConceptState = {
  images: [],
};

// Create a Redux slice using createSlice
const conceptSlice = createSlice({
  name: "concept", // The name of the slice, used in action type names
  initialState, // The initial state of the slice
  reducers: {
    // Define a reducer function to set images in the state
    setImages(state, action: PayloadAction<string[]>) {
      // Update the 'images' field in the state with the payload data
      state.images = action.payload;
    },
  },
});

// Export the action creator generated by createSlice
export const { setImages } = conceptSlice.actions;

// Export the reducer generated by createSlice
export default conceptSlice.reducer;
