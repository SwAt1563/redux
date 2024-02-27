// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';


// counter state
const initialState = {
    count: 0,
    };

// counter slice
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        },
        reset: (state) => {
            state.count = 0;
        },
    },
});

// export actions
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// export reducer
export default counterSlice.reducer;
