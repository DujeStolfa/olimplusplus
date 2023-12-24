import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userService from "../../services/api/routes/users";
import User from "../../types/models/User";
import CreateAdminInput from "../../types/inputs/user/CreateAdminInput";
import EditAdminInput from "../../types/inputs/user/EditAdminInput";

interface AdminState {
  admins: User[];
}

interface EditAdminData{
  admin: EditAdminInput;
  adminId: number;
}

const initialState: AdminState = {
  admins: [],
}

const fetchAdmins = createAsyncThunk(
  'admins/fetchAll',
  async () => {
    const response = await userService.getAllAdmin();
    return response.data;
  }
);

const deleteAdmin = createAsyncThunk(
    'auth/deleteAdminStatus',
    async (userId: number) => {
      const response = await userService.deleteAdmin(userId);
      return response.data;
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
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchAdmins.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.admins = action.payload;
      });
    }
  });

  const createAdmin = createAsyncThunk(
    'auth/createAdminStatus',
    async (data: CreateAdminInput) => {
      const response = await userService.createAdmin(data);
      return response.data;
    }
  );

export {
    fetchAdmins,
    deleteAdmin,
    editAdmin,
    createAdmin
  }
  
export default adminSlice.reducer;