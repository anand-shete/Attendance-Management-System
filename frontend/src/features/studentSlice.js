import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
    name: "student",
    initialState: {
        _id: null,
        fullname: null,
        prn: null,
        role: null
    },
    reducers: {
        setStudent: (state, action) => {
            state._id = action.payload._id;
            state.fullname = action.payload.fullname;
            state.prn = action.payload.prn;
            state.role = action.payload.role;
        },
        clearStudent: (state, action) => {
            state._id = null;
            state.fullname = null;
            state.prn = null;
            state.role = null;
        }
    }
})

export const { setStudent, clearStudent } = studentSlice.actions;
export default studentSlice.reducer;