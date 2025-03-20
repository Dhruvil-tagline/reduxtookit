const initialState = {
    exams: [],
    loading: false,
    error: null,
};

const examReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_EXAMS_REQUEST":
            return { ...state, loading: true, error: null };
        case "FETCH_EXAMS_SUCCESS":
            return { ...state, loading: false, exams: action.payload };
        case "FETCH_EXAMS_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "DELETE_EXAM_REQUEST":
            return { ...state, loading: true };
        case "DELETE_EXAM_SUCCESS":
            return { ...state, loading: false, exams: state.exams.filter((exam) => exam._id !== action.payload) };
        case "DELETE_EXAM_FAILURE":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default examReducer;
