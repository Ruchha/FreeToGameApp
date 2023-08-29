import { PayloadAction, createSlice } from "@reduxjs/toolkit";



interface FilterState {
    [key: string]: string;
    platform: "all" | "pc" | "browser";
    "sort-by": "release-date" | "popularity" | "alphabetical" | "";
    tag: string;
}

const initialState: FilterState = {
    tag: "",
    platform: "all",
    "sort-by": "",
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<{ key: keyof FilterState, value: string }>) {
            state[action.payload.key] = action.payload.value
        },
        removeFilter(state) {
            state.platform = "all"
            state["sort-by"] = ""
            state.tag = ""
        }
    }
})
export const { setFilter, removeFilter } = filterSlice.actions

export default filterSlice.reducer