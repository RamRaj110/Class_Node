import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
          return  action.payload;
        },
        // eslint-disable-next-line no-unused-vars
        removeFeed:(state)=>{
            return null;
        }

    }
})

export const {addFeed,removeFeed} =feedSlice.actions


export default feedSlice.reducer