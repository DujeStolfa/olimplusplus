import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userService from "../../services/api/routes/users";
import User from "../../types/models/User";
import CreateAdminInput from "../../types/inputs/user/CreateAdminInput";
import EditAdminInput from "../../types/inputs/user/EditAdminInput";
import { findIndex, remove } from "lodash";

interface AdminState {
  admins: User[];
  adminError: boolean | undefined;
}

interface EditAdminData {
  admin: EditAdminInput;
  adminId: number;
}

const initialState: AdminState = {
  admins: [],
  adminError: undefined,
}

const fetchAdmins = createAsyncThunk(
  'admins/fetchAll',
  async () => {
    const response = await userService.getAllAdmin();
    return response.data;
  }
);

const createAdmin = createAsyncThunk(
  'auth/createAdminStatus',
  async (data: CreateAdminInput) => {
    const response = await userService.createAdmin(data);
    return response.data;
  }
);

const deleteAdmin = createAsyncThunk(
  'auth/deleteAdminStatus',
  async (userId: number) => {
    const response = await userService.deleteAdmin(userId);
    return userId;
  }
);

const editAdmin = createAsyncThunk(
  'auth/editAdminStatus',
  async (admin: EditAdminData) => {
    const response = await userService.editAdmin(admin.admin, admin.adminId);
    return response.data;
  }
);

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.adminError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdmins.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.admins = action.payload;
    });

    builder.addCase(createAdmin.fulfilled, (state, action: PayloadAction<User>) => {
      state.admins.push(action.payload);
      state.adminError = false;
    }).addCase(createAdmin.rejected, (state, action) => {
      console.log("eeeee")
      state.adminError = true;
    });

    builder.addCase(editAdmin.fulfilled, (state, action: PayloadAction<User>) => {
      let idx = findIndex(state.admins, el => el.userid === action.payload.userid);
      state.admins[idx] = action.payload;
    });

    builder.addCase(deleteAdmin.fulfilled, (state, action: PayloadAction<number>) => {
      remove(state.admins, el => el.userid === action.payload)
    });
  }
});

export const {
  clearAdminError,
} = adminSlice.actions;

export {
  fetchAdmins,
  deleteAdmin,
  editAdmin,
  createAdmin,
}

export default adminSlice.reducer;