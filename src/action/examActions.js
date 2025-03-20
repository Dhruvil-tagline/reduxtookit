import { toast } from "react-toastify";
import { deleteRequest, getRequest } from "../utils/api";

// ✅ Fetch Exams Action
export const fetchExams = (token) => async (dispatch) => {
    dispatch({ type: "FETCH_EXAMS_REQUEST" });

    try {
        const response = await getRequest("dashboard/Teachers/viewExam", token);
        if (response?.statusCode === 200) {
            dispatch({ type: "FETCH_EXAMS_SUCCESS", payload: response.data });
        } else {
            dispatch({ type: "FETCH_EXAMS_FAILURE", payload: response?.message });
        }
    } catch (error) {
        dispatch({ type: "FETCH_EXAMS_FAILURE", payload: error.message });
    }
};

// ✅ Delete Exam Action
export const deleteExam = (id, token) => async (dispatch) => {
    dispatch({ type: "DELETE_EXAM_REQUEST" });

    try {
        const response = await deleteRequest(`dashboard/Teachers/deleteExam?id=${id}`, token);
        if (response?.statusCode === 200) {
            dispatch({ type: "DELETE_EXAM_SUCCESS", payload: id });
            toast.success("Exam deleted successfully");
        } else {
            dispatch({ type: "DELETE_EXAM_FAILURE", payload: response?.message });
            toast.error(response?.message);
        }
    } catch (error) {
        dispatch({ type: "DELETE_EXAM_FAILURE", payload: error.message });
        toast.error(error.message);
    }
};
