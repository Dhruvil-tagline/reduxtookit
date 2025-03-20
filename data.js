import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchExams, deleteExam } from "../../redux/actions/examActions";
import ButtonCom from "../../CommonComponent/ButtonCom";
import Table from "../../CommonComponent/Table";

const tableHeader = ["Subject", "Email", "Notes", "View Exam", "Delete Exam"];

const ExamList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { exams, loading } = useSelector((state) => state.exams);
    const { token } = useSelector((state) => state.auth); // ✅ Get token from Redux

    useEffect(() => {
        dispatch(fetchExams(token)); // ✅ Fetch exams when component mounts
    }, [dispatch, token]);

    const handleExaView = (exam) => {
        navigate(`/teacher/exam/${exam._id}`, {
            state: { subject: exam.subjectName, notes: exam.notes, id: exam._id },
        });
    };

    const handleExaDelete = (id) => {
        let confirmDelete = confirm("Are you sure you want to delete this exam?");
        if (confirmDelete) {
            dispatch(deleteExam(id, token)); // ✅ Call delete action
        }
    };

    const tableData = useMemo(() => {
        return exams.map((val) => ({
            Subject: val.subjectName,
            Email: val.email,
            Notes: val.notes.join(", "),
            "View Exam": <ButtonCom text="View Exam" onClick={() => handleExaView(val)} color="green" />,
            "Delete Exam": <ButtonCom text="Delete Exam" onClick={() => handleExaDelete(val._id)} color="red" />,
        }));
    }, [exams]);

    return (
        <div>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                {loading ? <p>Loading exams...</p> : <Table tableHeader={tableHeader} tableData={tableData} />}
            </div>
        </div>
    );
};

export default ExamList;
