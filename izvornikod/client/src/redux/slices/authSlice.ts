import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authService from "../../services/api/routes/auth";
import usersService from "../../services/api/routes/users";
import User from "../../types/models/User";
import LoginInput from "../../types/inputs/user/LoginInput";
import RegisterInput from "../../types/inputs/user/RegisterInput";
import CreateAdminInput from "../../types/inputs/user/CreateAdminInput";
import EditPasswordInput from "../../types/inputs/user/EditPasswordInput";

interface AuthState {
  user: User | undefined;
  authenticated: boolean | undefined;
}

const initialState: AuthState = {
  user: undefined,
  authenticated: undefined,
};

const attemptLogin = createAsyncThunk(
  'auth/loginStatus',
  async (user: LoginInput) => {
    const response = await authService.login(user);
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

const registerStudent = createAsyncThunk(
  'auth/registerStudentStatus',
  async (data: RegisterInput) => {
    const response = await usersService.registerStudent(data);
    return response.data;
  }
);

const createAdmin = createAsyncThunk(
  'auth/createAdminStatus',
  async (data: CreateAdminInput) => {
    const response = await usersService.createAdmin(data);
    return response.data;
  }
);

const editPassword = createAsyncThunk(
  'auth/editPasswordStatus',
  async (data: EditPasswordInput) => {
    const response = await usersService.editPassword(data);
    return response.data;
  }
);

const deleteCurrentUser = createAsyncThunk(
  'auth/deleteCurrentUSer',
  async (userid: number) => {
    const response = await usersService.deleteUser(userid);
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state, action: PayloadAction<number>) => {
      state.user = undefined;
      state.authenticated = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(attemptLogin.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.authenticated = true;
    }).addCase(attemptLogin.rejected, (state, action) => {
      state.authenticated = false;
    });
    builder.addCase(attemptLogout.fulfilled, (state, action: PayloadAction<User['userid']>) => {
      state.user = undefined;
      state.authenticated = undefined;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
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
  registerStudent,
  createAdmin,
  editPassword,
  deleteCurrentUser,
};

export default authSlice.reducer;
