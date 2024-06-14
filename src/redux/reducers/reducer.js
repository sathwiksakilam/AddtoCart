const initialState = {
    carts: []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART":
            const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.carts[itemIndex].qnty += 1;
            } else {
                const newItem = { ...action.payload, qnty: 1 };
                return {
                    ...state,
                    carts: [...state.carts, newItem]
                }
            }
            return { ...state }; // Ensure to return state after mutation
        case "RMV_CART":
            const filteredData = state.carts.filter((ele) => ele.id !== action.payload);
            return {
                ...state,
                carts: filteredData
            };
        case "RMV_ONE":
            const itemIndexDec = state.carts.findIndex((item) => item.id === action.payload.id);
            if (state.carts[itemIndexDec].qnty > 1) {
                state.carts[itemIndexDec].qnty -= 1;
                return { ...state };
            } else if (state.carts[itemIndexDec].qnty === 1) {
                const newData = state.carts.filter((ele) => ele.id !== action.payload.id);
                return {
                    ...state,
                    carts: newData
                };
            }
            return { ...state }; 
        default:
            return state;
    }
}
