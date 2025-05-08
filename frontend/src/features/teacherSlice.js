import { createSlice } from '@reduxjs/toolkit';

const teacherSlice = createSlice({
    name: "teacher",
    initialState: {
        _id: null,
        fullname: null,
        subject: null,
        faculty_id: null,
        role: null,
    },
    reducers: {
        setTeacher: (state, action) => {
            state._id = action.payload._id;
            state.fullname = action.payload.fullname;
            state.subject = action.payload.subject;
            state.faculty_id = action.payload.faculty_id;
        },
        clearTeacher: (state, action) => {
            state._id = null;
            state.fullname = null;
            state.subject = null;
            state.faculty_id = null;
            state.role = null;
        }
    }
})

export const { setTeacher, clearTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;