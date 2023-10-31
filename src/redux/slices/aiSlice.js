import { createSlice } from "@reduxjs/toolkit";
import { generateChat } from '../thunks/aiAPI';

const initialState = {
    error: '',
    chatMessages: [],
    loading: false
}

export const aiSlice = createSlice({
    name: "ai",
    initialState,
    reducers: {
        addUserMessage: (state, action) => ({
            ...state,
            chatMessages: [...state.chatMessages, { content: action.payload, role: "user" }]
        })
    },
    extraReducers: (builder) => {
        builder
        .addCase(generateChat.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(generateChat.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.chatMessages = [...state.chatMessages, action.payload.choices[0].message ];
        })
        .addCase(generateChat.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export const { addUserMessage } = aiSlice.actions;

export default aiSlice.reducer;