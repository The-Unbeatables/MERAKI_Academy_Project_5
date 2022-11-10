import { createSlice } from "@reduxjs/toolkit";

const productOrdersSlice = createSlice({
    name: "productOrders",
    initialState: {
        userProductOrders: [],
        allProductOrders: []
    },
    reducers: {
        setUserProductOrders: (state, action) => {
            state.userProductOrders = action.payload
        },

        addUserProductOrder: (state, action) => {
            state.userProductOrders.push(action.payload)
        },

        deleteUserProductOrder: (state, action) => {
            state.userProductOrders = state.userProductOrders.filter((elem, i) => {
                return elem.id !== action.payload
            })
        },

        updateUserProductOrder: (state, action) => {
            state.userProductOrders = state.userProductOrders.map((elem, i) => {
                if(elem.id === action.payload.id){
                    return action.payload
                }else{
                    return elem
                }
            })
        },
        getAllProductOrders: (state, action) => {
            state.allProductOrders = action.payload
        }
    }
})

export default productOrdersSlice.reducer;
export const { setUserProductOrders, addUserProductOrder, deleteUserProductOrder, updateUserProductOrder, getAllProductOrders } = productOrdersSlice.actions;