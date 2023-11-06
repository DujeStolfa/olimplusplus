import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    user: string | undefined;
}

const initialState: AuthState = {
    user: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
});

export default authSlice.reducer;
