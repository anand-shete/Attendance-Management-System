import { configureStore } from '@reduxjs/toolkit';
import teacherReducer from '../features/teacherSlice';
import qrCodeReducer from '@/features/qrCodeSlice';
import studentReducers from "@/features/studentSlice";

const store = configureStore({
    reducer: {
        teacher: teacherReducer,
        qrCode: qrCodeReducer,
        student: studentReducers
    }
})
export default store;