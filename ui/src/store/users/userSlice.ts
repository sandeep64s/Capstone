import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import {getCookie, setCookie, eraseCookie} from "../../components/team1/utils/cookies";
import { entryType, User } from "../../types/UserTypes";
const client = axios.create({ baseURL: `${import.meta.env.VITE_SERVERURL}/api/v1` });

const initialState = {
  loading: false,
  users: [],
  // currentUser : {
  //   username: "",
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   dob: "",
  //   password: "",
  //   isActive: true
  // },
  error: "",
  loginResponse: {
    userValidated: false,
    passwordValidated: false,
    userDeleted: false
  },
  signupResponse: {
    validity : false,
    message:""
  }
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return client.get("/login/").then((response: AxiosResponse) => {
    return response.data;
  });
});

export const addUser = createAsyncThunk("user/addUser", (body: entryType) => {
  return client.post("/signup/", body).then((response: AxiosResponse) => {
    return response.data;
  });
});

export const loginUser = createAsyncThunk("user/loginUser", (body: { username: string, password: string }) => {
  return client.post("/login/validate-user", body).then((response: AxiosResponse) => {
    console.log(response.data);
    return response.data;
  })
});

export const editProfile = createAsyncThunk("user/editProfile", (body: User) => {
  return client.patch("/login/update-one", body).then((reponse: AxiosResponse) => {
    console.log(reponse.data);
    return reponse.data;
  })
})

export const deleteUsers = createAsyncThunk("user/delete-selected", (body: { username: string[] }) => {
  return client.patch("/login/delete-selected", body).then((response: AxiosResponse) => {
    return response.data
  })
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetLogin: (state) => {
      eraseCookie();
      window.localStorage.clear();
      
      // state.currentUser = {
      //   username: "",
      //   first_name: "",
      //   last_name: "",
      //   email: "",
      //   dob: "",
      //   password: "",
      //   isActive: true
      // };
      state.loginResponse = {
        userValidated: false,
        passwordValidated: false,
        userDeleted: false
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      console.log("running");
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log(action);
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message || "something went wrong";
    });
    builder.addCase(addUser.pending, (state) => {
      console.log("running");
      state.loading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      console.log(action);
      state.loading = false;
      state.signupResponse = action.payload
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "something went wrong";
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.loginResponse = action.payload.loginResponse;
      setCookie("user", JSON.stringify(action.payload.currentUser))      
      window.localStorage.setItem("role",action.payload.currentUser.role)
      console.log();
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "something went wrong";
    });
    builder.addCase(deleteUsers.pending, (state) => {
      console.log("running");
      state.loading = true;
    });
    builder.addCase(deleteUsers.fulfilled, (state, action) => {
      console.log(action);
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(deleteUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "something went wrong";
    });
    builder.addCase(editProfile.pending, (state) => {
      console.log("running");
      state.loading = true;
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      console.log(action);
      state.loading = false;
      state.users = action.payload.data;
      console.log(action.payload.currentUser);
      eraseCookie();
      setCookie("user",JSON.stringify(action.payload.currentUser[0]));
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "something went wrong";
    });
  }
})

export default userSlice.reducer;
export const { resetLogin } = userSlice.actions; 