import { RootState } from "./../index";
import { TrainingType } from "../../types/types";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  createTraining,
  getTrainings,
  deleteTraining,
  editTraining,
  getTraining,
  getTrainingsPagination,
  createTrainingWithPagination
} from "../../components/team3/server/index.js";

interface IState {
  trainings: TrainingType[];
  loading: string;
  trainingFound: TrainingType;
  trainingCount: number;
  page: number;
  limit: number;
}
const initialState = {
  trainings: [],
  loading: "idle",
  trainingFound: {},
  trainingCount: 100,
  page: 1,
  limit: 5
} as IState;

const trainingSlice = createSlice({
  name: "trainings",
  initialState,
  reducers: {
    clearTrainingFound: (state, action) => {
      state.trainingFound = {};
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setLimit: (state, action) => {
      state.limit = action.payload
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<IState>) => {
    builder
      .addCase(fetchTrainings.fulfilled, (state, action) => {
        state.trainings = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchTrainings.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchTrainings.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(fetchTrainingsWithPagination.fulfilled, (state, action) => {
        state.trainings = action.payload.data;
        state.trainingCount = action.payload.count;
        state.loading = "succeeded";
      })
      .addCase(fetchTrainingsWithPagination.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchTrainingsWithPagination.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(fetchTraining.fulfilled, (state, action) => {
        state.trainingFound = action.payload[0];
        // alert(JSON.stringify(state.trainingFound));
      })
      .addCase(fetchTraining.pending, (state, action) => {
        state.loading = "pending";
        // console.log(state.trainingFound);
      })
      .addCase(fetchTraining.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(deleteTrainingThunk.fulfilled, (state, action) => {
        state.trainings = action.payload;
      })
      .addCase(deleteTrainingThunk.rejected, (state, action) => {
        alert("deletion unsuccessful");
      })

      .addCase(editTrainingThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.trainingFound = action.payload.modifiedData[0];
        state.trainings = action.payload.data;
      })
      .addCase(editTrainingThunk.rejected, (state, action) => {
        alert("edit unsuccessful");
      })
      .addCase(addTrainingThunk.fulfilled, (state, action) => {
        state.trainings = action.payload.data;
        state.trainingCount = action.payload.count;
      })
      .addCase(addTrainingThunk.rejected, (state, action) => {
        throw new Error("add unsuccessful");
      });
  },
});

export const { clearTrainingFound, setPage, setLimit } = trainingSlice.actions;

export const selectTrainings = (state: RootState) => state.trainings.trainings;
export const selectLoading = (state: RootState) => state.trainings.loading;
export const selectTraining = (state: RootState) => state.trainings.trainingFound;
export const selectTrainingCount = (state: RootState) => state.trainings.trainingCount;
export const selectPage = (state: RootState) => state.trainings.page;
export const selectLimit = (state: RootState) => state.trainings.limit;

export const fetchTrainings = createAsyncThunk(
  "training/fetchTrainings",
  async () => {
    const res = await getTrainings();
    return res.data.data;
  }
);
export interface PageDetails {
  page: number;
  limit: number;
}
export const fetchTrainingsWithPagination = createAsyncThunk(
  "training/fetchTrainingsPagination",
  async (pageDetails: PageDetails) => {
    const { page, limit } = pageDetails;
    const res = await getTrainingsPagination(page, limit);
    return res.data;
  }
);

export const fetchTraining = createAsyncThunk(
  "training/fetchTraining",
  async (id: string) => {
    const res = await getTraining(id);
    return res.data;
  }
);

export const editTrainingThunk = createAsyncThunk(
  "training/editTrainingThunk",
  async (Training: TrainingType, { rejectWithValue }) => {
    try {
      console.log("inside training");
      console.log(Training);
      const id = Training.trainingId;
      const res = await editTraining(id!, Training);
      console.log(res.data)
      return res.data;
    }
    catch (err) {
      console.log(err)
      return rejectWithValue("");
    }

  }
);
export const deleteTrainingThunk = createAsyncThunk(
  "training/deleteTrainingThunk",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteTraining(id);
      return res.data.data;
    }
    catch (err) {
      return rejectWithValue("");
    }
  }
);
interface AddTrainingType {
  training: TrainingType;
  pageDetails: PageDetails;
}
export const addTrainingThunk = createAsyncThunk(
  "training/addTrainingThunk",
  async ({ training, pageDetails }: AddTrainingType, { rejectWithValue }) => {
    const { page, limit } = pageDetails;
    try {
      const res = await createTrainingWithPagination(training, page, limit);
      return res.data;
    } catch (err: any) {
      return rejectWithValue("");
    }
  }
);
//default export

export default trainingSlice.reducer;
