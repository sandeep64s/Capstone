import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction, PayloadActionCreator } from "@reduxjs/toolkit";
import { ObjectId } from "mongodb";
import { Trainer } from "../../types/Trainer";

type InitialState = {
  loading: boolean;
  trainers: Trainer[];
  error: string;
  showAlert: boolean;
};

const initialState: InitialState = {
  loading: false,
  trainers: [],
  error: " ",
  showAlert: false,
};
const base = `${import.meta.env.VITE_SERVERURL}/api/v1/trainer`;

//view data
export const fetchTrainers = createAsyncThunk("/trainers", () => {
  return axios
    .get(`${base}/trainers`)
    .then((response) => response.data);
});

//delete data
export const deleteTrainers = createAsyncThunk(
  "/deleteTrainer",
  (id: ObjectId | string) => {
    return axios
      .post(`${base}/deleteTrainer/` + id)
      .then((response) => response.data);
  }
);

//add trainer or save trainer
export const saveTrainers = createAsyncThunk("/saveTrainer", (values: any) => {
  console.log(values);
  return axios
    .post(`${base}/saveTrainer/`, values)
    .then((response) => {
      return response.data;
    });
});

//update trainer details
export const updateTrainers = createAsyncThunk(
  "/updateTrainer",
  (entry: Trainer) => {
    return axios
      .post(`${base}/updateTrainer/`, entry)
      .then((response) => response.data);
  }
);


//filter details

export const filterTrainers = createAsyncThunk(
  "/filterTrainer",
  (query: string) => {
    return axios
      .get(`${base}/filter/` + query)
      .then((response) => response.data);
  }
);

const TrainerSlice = createSlice({
  name: "trainer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch training reducer created with actions
    builder.addCase(fetchTrainers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTrainers.fulfilled,
      (state, action: PayloadAction<Trainer[]>) => {
        state.loading = false;
        state.trainers = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchTrainers.rejected, (state, action) => {
      state.loading = false;
      state.trainers = [];
      state.error = action.error.message || "Something went wrong in view";
    });
    // delete training reducer created with actions
    builder.addCase(deleteTrainers.pending, (state) => {
      state.loading = true;
      state.showAlert = false;
    });
    builder.addCase(
      deleteTrainers.fulfilled,
      (state, action: PayloadAction<Trainer[]>) => {
        state.loading = false;
        state.trainers = action.payload;
        state.error = "Successfully deleted!";
      }
    );
    builder.addCase(deleteTrainers.rejected, (state, action) => {
      state.loading = false;
      state.trainers = [];
      state.error = action.error.message || "Something went wrong in deleting";
    });
    // save training reducer created with actions
    builder.addCase(saveTrainers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      saveTrainers.fulfilled,
      (state, action: PayloadAction<Trainer[]>) => {
        state.loading = false;
        state.trainers = action.payload;
        state.error = "Successfully added!";
      }
    );
    builder.addCase(saveTrainers.rejected, (state, action) => {
      state.loading = false;
      state.trainers = [];
      state.error =
        action.error.message || "Something went wrong in saving the details";
    });
    // update training reducer created with actions
    builder.addCase(updateTrainers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateTrainers.fulfilled,
      (state, action: PayloadAction<Trainer[]>) => {
        state.loading = false;
        state.trainers = action.payload;
        state.error = "Successfully updated!";
      }
    );
    builder.addCase(updateTrainers.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message || "Something went wrong in updating the details";
    });
    builder.addCase(filterTrainers.fulfilled, (state, action: PayloadAction<Trainer[]>) => {
      state.loading = false;
      state.trainers = action.payload;
      state.error = "Filter successfully carried out!";
    });
    builder.addCase(filterTrainers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterTrainers.rejected, (state, action) => {
      state.loading = false;
      state.trainers = [];
      state.error = "Filter unsucessfully carried out!";
    });
  },
});

export default TrainerSlice.reducer;
