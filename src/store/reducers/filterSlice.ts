import { PayloadAction, createSlice } from "@reduxjs/toolkit";



interface FilterState {
    [key: string]: string;
    "platform": string;
    "category": string;
    "sort-by": string;
}

const initialState : FilterState = {
    "platform": "all",
    "category": "",
    "sort-by": ""
}

export const filterSlice = createSlice({
    name:"filter",
    initialState,
    reducers:{
        setFilter(state, action: PayloadAction<{key: keyof FilterState, value:string}>){
            state[action.payload.key] = action.payload.value 
        },
        removeFilter(state){
            state.category = ""
            state.platform = ""
            state["sort-by"] = ""
        }
    }
})
export const {setFilter, removeFilter} = filterSlice.actions

export default filterSlice.reducer