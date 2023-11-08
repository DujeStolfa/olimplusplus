import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authService from "../../services/api/routes/auth";
import Korisnik from "../../types/models/Korisnik";
import LoginInput from "../../types/inputs/korisnik/LoginInput";

interface AuthState {
  korisnik: Korisnik | undefined;
  authenticated: boolean | undefined;
}

const initialState: AuthState = {
  korisnik: undefined,
  authenticated: undefined,
};

const attemptLogin = createAsyncThunk(
  'auth/loginStatus',
  async (korisnik: LoginInput) => {
    const response = await authService.login(korisnik);
    return response.data;
  }
);

const attemptLogout = createAsyncThunk(
  'auth/logoutStatus',
  async () => {
    const response = await authService.logout();
    return response.data;
  }
);

const fetchCurrentUser = createAsyncThunk(
  'auth/checkCurrentUserStatus',
  async () => {
    const response = await authService.getUser();
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state, action: PayloadAction<number>) => {
      state.korisnik = undefined;
      state.authenticated = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(attemptLogin.fulfilled, (state, action: PayloadAction<Korisnik>) => {
      state.korisnik = action.payload;
      state.authenticated = true;
    }).addCase(attemptLogin.rejected, (state, action) => {
      state.authenticated = false;
    });
    builder.addCase(attemptLogout.fulfilled, (state, action: PayloadAction<Korisnik['korisnikid']>) => {
      state.korisnik = undefined;
      state.authenticated = undefined;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<Korisnik>) => {
      state.korisnik = action.payload;
      state.authenticated = true;
    });
  }
});

export const {
  clearUser,
} = authSlice.actions;

export {
  attemptLogin,
  attemptLogout,
  fetchCurrentUser,
};

export default authSlice.reducer;
