import { createSlice } from "@reduxjs/toolkit";

const serviceOrdersSlice = createSlice({
    name: "serviceOrders",
    initialState: {
        workerServiceOrders: [],
        allServiceOrders: [],
        userServiceOrders: []
    },
    reducers: {
        setWorkerServiceOrders: (state, action) => {
            state.workerServiceOrders = action.payload
        },

        addWorkerServiceOrder: (state, action) => {
            state.workerServiceOrders = state.workerServiceOrders.push(action.payload)
        },

        deleteWorkerServiceOrder: (state, action) => {
            state.workerServiceOrders = state.workerServiceOrders.filter((elem, i) => {
                return elem.id !== action.payload
            })
        },

        updateWorkerServiceOrder: (state, action) => {
            state.workerServiceOrders = state.workerServiceOrders.map((elem, i) => {
                if(elem.id === action.payload.id){
                    return action.payload
                }else{
                    return elem
                }
            })
        },
        getAllServiceOrders: (state, action) => {
            state.allServiceOrders = action.payload
        },

        setUserServiceOrders: (state, action) => {
            state.userServiceOrders = action.payload
        },
        deleteUserServiceOrder: (state, action) => {
            state.userServiceOrders = state.userServiceOrders.filter((elem, i) => {
                return elem.id !== action.payload
            })
        },

        updateUserServiceOrder: (state, action) => {
            state.userServiceOrders = state.userServiceOrders.map((elem, i) => {
                if(elem.id === action.payload.id){
                    return action.payload
                }else{
                    return elem
                }
            })
        }
    }
})

export default serviceOrdersSlice.reducer;
export const { setWorkerServiceOrders, addWorkerServiceOrder, deleteWorkerServiceOrder,
     updateWorkerServiceOrder, getAllServiceOrders,
     setUserServiceOrders, deleteUserServiceOrder, updateUserServiceOrder } = serviceOrdersSlice.actions;