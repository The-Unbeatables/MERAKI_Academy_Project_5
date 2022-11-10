import { createSlice } from "@reduxjs/toolkit";

const workerSlice = createSlice({
    name : "workers",
    initialState:{
        workers:[],
        profession: '',
        selectedWorker: ''
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
        },
        setProfession:(state , action)=>{
            state.profession = action.payload
        },
        setSelectedWorker: (state, action) => {
            state.selectedWorker = action.payload
        }
    }
})

export const{setWorkers , updateWorker , deleteWorker, setProfession, setSelectedWorker} = workerSlice.actions
export default workerSlice.reducer
