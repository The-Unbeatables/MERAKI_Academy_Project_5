import { createSlice } from "@reduxjs/toolkit"; 

const authSlice = createSlice({
    name: "auth",
    initialState:{
        token: null,
        userId: null,
        isLoggedIn: false
    },
    reducers:{
        setLogin: (state, action) => {
            state.token = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload)
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setLogout: (state, action) => {
            state.token = null;
            state.userId = null;
            state.isLoggedIn = false;
            localStorage.clear();
        }
    }
})

export default authSlice.reducer;
export const { setLogin, setUserId, setLogout } = authSlice.actions;