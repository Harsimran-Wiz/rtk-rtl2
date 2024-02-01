import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {},
    },
    reducers: {
        setUser: (state, action) => {
            return {
                ...state,
                data: action.payload
            }
        }
    }
})

export const { setUser } = userSlice.actions
export const selectUser = (state) => state.user.data;
export default userSlice.reducer;