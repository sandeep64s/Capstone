import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Trainee, InitialState, PostTrainee } from "../../types";

const baseURL = `${import.meta.env.VITE_SERVERURL}/api/v1/trainee`;
const initialState: InitialState = {
	loading: false,
	trainees: [],
	page: {
		perPage: 0,
		pageCount: 0,
		total: 0,
		currentPage: 0,
	},
	error: "",
};

//GET

export const fetchAllTrainees = createAsyncThunk(
	"trainee/fetchAllTrainees",
	(
		{ perPage, currPage }: { perPage: number; currPage: number } = {
			perPage: 5,
			currPage: 1,
		}
	) => {
		return axios
			.get(`${baseURL}/?t=active&pp=${perPage}&p=${currPage}`)
			.then((response) => response.data.trainees)
			.catch((error) => Promise.reject(error.response.data));
	}
);

export const fetchActiveTrainees = createAsyncThunk(
	"trainee/fetchActiveTrainees",
	(
		{ perPage, currPage }: { perPage: number; currPage: number } = {
			perPage: 5,
			currPage: 1,
		}
	) => {
		return axios
			.get(`${baseURL}/?t=active&pp=${perPage}&p=${currPage}`)
			.then((response) => response.data)
			.catch((error) => Promise.reject(error.response.data));
	}
);

//POST

export const postTrainee = createAsyncThunk(
	"trainee/postTrainee",
	(object: PostTrainee) => {
		return axios
			.post(`${baseURL}`, object)
			.then((response) => response.data)
			.catch((error) => Promise.reject(error.response.data));
	}
);

//UPDATE

export const updateTrainee = createAsyncThunk(
	"trainee/updateTrainee",
	({ object, id }: { object: FormData; id: number }) => {
		return axios
			.put(`${baseURL}/${id}`, object, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((response) => response.data)
			.catch((error) => Promise.reject(error.response.data));
	}
);

//DELETE

export const deleteTrainee = createAsyncThunk(
	"trainee/deleteTrainee",
	({ id, hardDelete }: { id: number; hardDelete?: boolean }) => {
		const type = hardDelete ? "hard" : "soft";
		return axios
			.delete(`${baseURL}/${id}/?t=${type}`)
			.then((response) => response.data)
			.catch((error) => Promise.reject(error.response.data));
	}
);

//PATCH

export const activateTrainee = createAsyncThunk(
	"trainee/activateTrainee",
	(id: number) => {
		return axios
			.patch(`${baseURL}/${id}`)
			.then((response) => response.data)
			.catch((error) => Promise.reject(error.response.data));
	}
);

const TraineeSlice = createSlice({
	name: "trainee",
	initialState,
	reducers: {
		resetError(state) {
			state.error = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllTrainees.pending, (state) => {
			state.loading = true;
			state.error = "";
		});

		builder.addCase(
			fetchAllTrainees.fulfilled,
			(
				state,
				action: PayloadAction<{
					page: number;
					perPage: number;
					pageCount: number;
					total: number;
					trainees: Trainee[];
				}>
			) => {
				state.loading = false;
				state.trainees = action.payload.trainees;
				state.page = {
					currentPage: action.payload.page,
					perPage: action.payload.perPage,
					pageCount: action.payload.pageCount,
					total: action.payload.total,
				};
			}
		);

		builder.addCase(fetchAllTrainees.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});

		builder.addCase(fetchActiveTrainees.pending, (state) => {
			state.loading = true;
			state.error = "";
		});

		builder.addCase(
			fetchActiveTrainees.fulfilled,
			(
				state,
				action: PayloadAction<{
					page: number;
					perPage: number;
					pageCount: number;
					total: number;
					trainees: Trainee[];
				}>
			) => {
				state.loading = false;
				state.trainees = action.payload.trainees;
				state.page = {
					currentPage: action.payload.page,
					perPage: action.payload.perPage,
					pageCount: action.payload.pageCount,
					total: action.payload.total,
				};
			}
		);

		builder.addCase(fetchActiveTrainees.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});

		builder.addCase(postTrainee.pending, (state) => {
			state.loading = true;
			state.error = "";
		});

		builder.addCase(
			postTrainee.fulfilled,
			(state, action: PayloadAction<Trainee>) => {
				state.loading = false;
				state.trainees.pop();
				state.trainees.unshift(action.payload);
				state.page.total = state.page.total + 1;
			}
		);

		builder.addCase(postTrainee.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});

		builder.addCase(updateTrainee.pending, (state) => {
			state.loading = true;
			state.error = "";
		});

		builder.addCase(
			updateTrainee.fulfilled,
			(state, action: PayloadAction<Trainee>) => {
				state.loading = false;
				state.trainees.splice(
					state.trainees.findIndex(
						(trainee) => trainee._id === action.payload._id
					),
					1,
					action.payload
				);
			}
		);

		builder.addCase(updateTrainee.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});

		builder.addCase(deleteTrainee.pending, (state) => {
			state.loading = true;
			state.error = "";
		});

		builder.addCase(
			deleteTrainee.fulfilled,
			(
				state,
				action: PayloadAction<{
					page: number;
					perPage: number;
					pageCount: number;
					total: number;
					trainees: Trainee[];
				}>
			) => {
				state.loading = false;
				state.trainees = action.payload.trainees;
				state.page = {
					currentPage: action.payload.page,
					perPage: action.payload.perPage,
					pageCount: action.payload.pageCount,
					total: action.payload.total,
				};
			}
		);

		builder.addCase(deleteTrainee.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});

		builder.addCase(activateTrainee.pending, (state) => {
			state.loading = true;
			state.error = "";
		});

		builder.addCase(
			activateTrainee.fulfilled,
			(state, action: PayloadAction<Trainee>) => {
				state.loading = false;
				state.trainees.push(action.payload);
			}
		);

		builder.addCase(activateTrainee.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export const { resetError } = TraineeSlice.actions;
export default TraineeSlice.reducer;
