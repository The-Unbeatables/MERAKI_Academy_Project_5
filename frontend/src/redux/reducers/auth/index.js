import { createSlice } from "@reduxjs/toolkit"; 

const authSlice = createSlice({
    name: "auth",
    initialState:{
        token: null || localStorage.getItem('token'),
        userId: null,
        isLoggedIn: localStorage.getItem("token") ? true : false,
        // isLoggedIn: false,
        isAdmin: localStorage.getItem("token") ? true : false,
        users: []
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
        },
        setUsers:(state , action)=>{
            state.users = action.payload
        },
        updateUser:(state , action)=>{
            state.users= state.users.map((item)=>{
                if(item.id === action.payload.id){
                    return action.payload
                }else{
                    return item
                }
            })
        },
        deleteUser:(state , action)=>{
            state.users=state.users.filter((item)=>{
            return item.id != action.payload
            })
        }
    }
})

export default authSlice.reducer;
export const { setLogin, setUserId, setLogout, setAdminLogin, setUsers, updateUser, deleteUser } = authSlice.actions;