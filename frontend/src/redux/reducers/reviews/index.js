import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: []
    },
    reducers:{
        setWorkerReviews: (state, action) => {
            state.reviews = action.payload;
        },
        addWorkerReview: (state, action) => {
            state.reviews = state.reviews.push(action.payload)
        },
        deleteWorkerReview: (state, action) => {
            state.reviews = state.reviews.filter((elem, i) => {
                return elem.id !== action.payload
            })
        },
        updateWorkerReview: (state, action) => {
            state.reviews = state.reviews.map((elem, i) => {
                if(elem.id === action.payload.id){
                    return action.payload
                }else{
                    return elem
                }
            })
        }
    }
})

export default reviewsSlice.reducer;
export const { setWorkerReviews, addWorkerReview, deleteWorkerReview, updateWorkerReview } = reviewsSlice.actions;