import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentPlayer: 1
};

const slice = createSlice({
    // We use this prefix in the root of the redux store
    name: 'gameState',
    initialState,
    reducers: {
        setCurrentPlayer: (state, action) => {
            state.currentPlayer = action.payload
        }
    }
});

// Make actions easier to import
export const {
    setCurrentPlayer
} = slice.actions;

// Add selectors to the slice object
slice.selectors = {
    currentPlayer: s => s[slice.name].currentPlayer
};

export default slice;
