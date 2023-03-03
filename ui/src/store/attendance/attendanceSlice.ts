import { RootState } from "./../index";
import { AttendanceType, AttendanceWithoutSessionType } from "../../types/types";
import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import {
    getAttendance,
    getAttendanceWithSession,
    submitAttendance,
    submitAttendanceWithSession
} from "../../components/attendance/server/index.js";
type FetchAttendance = {
    trainingId: string,
    date: string
}
type FetchAttendanceWithSession = {
    trainingId: string,
    date: string,
    session: string
}

type SubmitAttendanceWithSession = {
    trainingId: string,
    date: string,
    session: string,
    traineesPresent: number[],
}
export const fetchAttendance = createAsyncThunk(
    "attendance/fetchAttendance",
    async (props: FetchAttendance) => {
        const { trainingId, date } = props;
        const res = await getAttendance(trainingId, date);
        console.log(res.data)
        return res.data;
    }
);

export const fetchAttendanceWithSession = createAsyncThunk(
    "attendance/fetchAttendanceWithSession",
    async (props: FetchAttendanceWithSession) => {
        const { trainingId, date, session } = props;
        console.log(props);
        const res = await getAttendanceWithSession(trainingId, date, session);
        console.log(res.data);
        return res.data;
    }
);
type SubmitAttendance = {
    trainingId: string,
    date: string,
    traineesPresentM: number[],
    traineesPresentE: number[],
    checkMSessionChanges: boolean,
    checkESessionChanges: boolean,
}
export const submitAttendanceReducer = createAsyncThunk(
    "attendance/submitAttendance",
    async (props: SubmitAttendance) => {
        const { traineesPresentM, traineesPresentE, trainingId, date, checkMSessionChanges, checkESessionChanges } = props;
        const res = await submitAttendance(traineesPresentM, traineesPresentE, trainingId, date, checkMSessionChanges, checkESessionChanges);
        console.log(res.data)
        return res.data;
    }
);

export const submitAttendanceWithSessionReducer = createAsyncThunk(
    "attendance/submitAttendanceWithSession",
    async (props: SubmitAttendanceWithSession) => {
        const { traineesPresent, trainingId, date, session } = props;
        console.log("props", props)
        const res = await submitAttendanceWithSession(traineesPresent, trainingId, date, session);
        console.log(res.data)
        return res.data;
    }
);

interface AttendanceSubmit {
    traineeId: number,
    attendance: string
}

interface I2State {
    loading: string;
    attendance: AttendanceType[];
    attendanceWithSession: AttendanceType[];
    submitAttendanceArray: AttendanceSubmit[];
    attendanceWithoutSession: AttendanceWithoutSessionType[];
    submitAttendanceWithoutSessionMArray: AttendanceSubmit[];
    submitAttendanceWithoutSessionEArray: AttendanceSubmit[];
}

const initialState = {
    loading: 'idle',
    attendance: [],
    attendanceWithSession: [],
    submitAttendanceArray: [],
    attendanceWithoutSession: [],
    submitAttendanceWithoutSessionMArray: [],
    submitAttendanceWithoutSessionEArray: [],
} as I2State;

const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {
        setSubmitAttendanceArray: (state, action) => {
            state.submitAttendanceArray = action.payload;
        },

        setSubmitAttendanceWithoutSessionMArray: (state, action) => {
            state.submitAttendanceWithoutSessionMArray = action.payload;
        },
        setSubmitAttendanceWithoutSessionEArray: (state, action) => {
            state.submitAttendanceWithoutSessionEArray = action.payload;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<I2State>) => {
        builder
            .addCase(fetchAttendance.fulfilled, (state, action) => {
                state.attendance = action.payload.map((e: AttendanceType) => {
                    if (e.attendance.toLocaleLowerCase() === "Present".toLocaleLowerCase()) return { ...e, attendance: "Present Present" }
                    if (e.attendance.toLocaleLowerCase() === "Morning Half Day".toLocaleLowerCase()) return { ...e, attendance: "Present Absent" }
                    if (e.attendance.toLocaleLowerCase() === "Evening Half Day".toLocaleLowerCase()) return { ...e, attendance: "Absent Present" }
                    if (e.attendance.toLocaleLowerCase() === "Absent".toLocaleLowerCase()) return { ...e, attendance: "Absent Absent" }

                });
                state.submitAttendanceWithoutSessionMArray = action.payload.map((e: AttendanceType) => {
                    if (e.attendance === "Morning Half Day" || e.attendance === "Present") {
                        return { traineeId: e.traineeId, attendance: "Present" }
                    }
                    return { traineeId: e.traineeId, attendance: "Absent" }
                }
                );
                state.submitAttendanceWithoutSessionEArray = action.payload.map((e: AttendanceType) => {
                    if (e.attendance === "Evening Half Day" || e.attendance === "Present") {
                        return { traineeId: e.traineeId, attendance: "Present" }
                    }
                    return { traineeId: e.traineeId, attendance: "Absent" }
                }
                );
                console.log("Sessionless")
                console.log(action.payload)
                state.loading = "succeeded";
            })
            .addCase(fetchAttendance.pending, (state, action) => {
                state.loading = "pending";
            })
            .addCase(fetchAttendance.rejected, (state, action) => {
                state.loading = "rejected";
            })
            .addCase(fetchAttendanceWithSession.fulfilled, (state, action) => {
                state.attendanceWithSession = action.payload;
                state.submitAttendanceArray = action.payload.map((e: AttendanceType) => ({ traineeId: e.traineeId, attendance: e.attendance }));
                state.loading = "succeeded";
            })
            .addCase(fetchAttendanceWithSession.pending, (state, action) => {
                state.loading = "pending";
            })
            .addCase(fetchAttendanceWithSession.rejected, (state, action) => {
                state.loading = "rejected";
            })
            .addCase(submitAttendanceReducer.fulfilled, (state, action) => {
                state.attendance = action.payload.map((e: AttendanceType) => {
                    if (e.attendance === "Present") return { ...e, attendance: "Present Present" }
                    if (e.attendance === "Morning Half Day") return { ...e, attendance: "Present Absent" }
                    if (e.attendance === "Evening Half Day") return { ...e, attendance: "Absent Present" }
                    return { ...e, attendance: "Absent Absent" }
                });
                state.submitAttendanceWithoutSessionMArray = action.payload.map((e: AttendanceType) => {
                    if (e.attendance === "Morning Half Day" || e.attendance === "Present") {
                        return { traineeId: e.traineeId, attendance: "Present" }
                    }
                    return { traineeId: e.traineeId, attendance: "Absent" }
                }
                );
                state.submitAttendanceWithoutSessionEArray = action.payload.map((e: AttendanceType) => {
                    if (e.attendance === "Evening Half Day" || e.attendance === "Present") {
                        return { traineeId: e.traineeId, attendance: "Present" }
                    }
                    return { traineeId: e.traineeId, attendance: "Absent" }
                }
                );

                console.log(action.payload);
                alert("Submitted successfully");
            })
            .addCase(submitAttendanceReducer.rejected, (state, action) => {
                alert("edit unsuccessful");
            })
            .addCase(submitAttendanceWithSessionReducer.fulfilled, (state, action) => {
                state.attendanceWithSession = action.payload;
                state.submitAttendanceArray = action.payload.map((e: AttendanceType) => ({ traineeId: e.traineeId, attendance: e.attendance }));
                console.log(action.payload);
                alert("Submitted successfully");
            })
            .addCase(submitAttendanceWithSessionReducer.rejected, (state, action) => {
                alert("edit unsuccessful");
            })
    },
});

export const { setSubmitAttendanceArray, setSubmitAttendanceWithoutSessionMArray, setSubmitAttendanceWithoutSessionEArray } = attendanceSlice.actions;

export const selectAttendance = (state: RootState) => state.attendance.attendance;
export const selectAttendanceWithSession = (state: RootState) => state.attendance.attendanceWithSession;

export const selectSubmitAttendanceWithoutSessionMArray = (state: RootState) => state.attendance.submitAttendanceWithoutSessionMArray;
export const selectSubmitAttendanceWithoutSessionEArray = (state: RootState) => state.attendance.submitAttendanceWithoutSessionEArray;
export const selectSubmitAttendanceArray = (state: RootState) => state.attendance.submitAttendanceArray;
export const selectLoading = (state: RootState) => state.attendance.loading;

export default attendanceSlice.reducer;
