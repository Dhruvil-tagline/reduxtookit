const initialState = {
    count: 0,
    loading: false,
};

// Correct export of reducer function
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + 1 };
        case "DECREMENT":
            return { ...state, count: state.count - 1 };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

export default userReducer;
