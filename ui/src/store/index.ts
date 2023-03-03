import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import userReducer from './users/userSlice';
import trainingReducer from './trainings/trainingsSlice';
import trainerReducer from './trainer/trainerSlice';
import traineeReducer from './trainee/traineeSlice';
import attendanceReducer from './attendance/attendanceSlice';

export const store = configureStore({
    reducer: {
        trainee: traineeReducer,
        trainer: trainerReducer,
        trainings: trainingReducer,
        user: userReducer,
        attendance: attendanceReducer
    }
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;