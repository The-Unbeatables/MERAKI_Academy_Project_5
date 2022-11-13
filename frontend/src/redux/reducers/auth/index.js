import { createSlice } from "@reduxjs/toolkit"; 

const authSlice = createSlice({
    name: "auth",
    initialState:{
        token: null || localStorage.getItem('token'),
        userId: null,
        isLoggedIn: false,
        isAdmin: false
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
            state.isAdmin = false;
            localStorage.clear();
        },
        setAdminLogin: (state, action) => {
            state.token = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload);
            state.isAdmin = true
        }
    }
})

export default authSlice.reducer;
export const { setLogin, setUserId, setLogout, setAdminLogin } = authSlice.actions;