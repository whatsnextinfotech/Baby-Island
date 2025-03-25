// import { createSlice } from "@reduxjs/toolkit";

// const initialValue = {
//     order : []
// }

// const orderSlice = createSlice({
//     name : 'order',
//     initialState : initialValue,
//     reducers : {
//         setOrder : (state,action)=>{
//             state.order = [...action.payload]
//         }
//     }
// })

// export const {setOrder } = orderSlice.actions

// export default orderSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    order: [],      // User's orders
    allOrders: []   // Admin panel - all orders
}

const orderSlice = createSlice({
    name: 'order',
    initialState: initialValue,
    reducers: {
        setOrder: (state, action) => {
            state.order = [...action.payload];
        },
        setAllOrders: (state, action) => {
            state.allOrders = [...action.payload];
        }
    }
})

export const { setOrder, setAllOrders } = orderSlice.actions;

export default orderSlice.reducer;
