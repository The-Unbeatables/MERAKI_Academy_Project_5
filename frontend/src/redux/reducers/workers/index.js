import { createSlice } from "@reduxjs/toolkit";

const workerSlice = createSlice({
    name : "workers",
    initialState:{
        workers:[],
    },
    reducers:{
        setWorkers:(state , action)=>{
            state.workers = action.payload
        },
        updateWorker:(state , action)=>{
            state.workers= state.workers.map((item)=>{
                if(item.id === action.payload.id){
                    return action.payload
                }else{
                    return item
                }
            })
        },
        deleteWorker:(state , action)=>{
            state.workers=state.workers.filter((item)=>{
            return item.id != action.payload
            })
        }
    }
})

export const{setWorkers , updateWorker , deleteWorker} = workerSlice.actions
export default workerSlice.reducer
