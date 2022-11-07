import {createSlice} from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: 'products',
    initialState:{
        products : [],
    },
    reducers:{
        setProduct:(state , action)=>{
            state.products = action.payload
        },
        addProduct:(state,action)=>{

        state.products.push(action.payload);
        },
        updateProduct: (state , action)=> {
            state.products = state.products.map((item)=>{
            if(item.id === action.payload.id){
                return action.payload   
            
            }
            else{
                return item
            }
           })
        },
        deleteProduct:(state,action)=>{
           state.products=state.products.filter((item)=>{
            return item.id != action.payload
           })
        },
         
    }
})

//title ,price,category ,items_left,image

export const {setProduct , addProduct , updateProduct , deleteProduct} =productSlice.actions
export default productSlice.reducer