import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import { deleteRequest, getRequest } from '../../utils/api';
import ButtonCom from '../../CommonComponent/ButtonCom';
import Table from '../../CommonComponent/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExams } from '../../action/examActions';
const tableHeader = ['Subject', 'Email', 'Notes', 'View Exam', 'Delete Exam'];

const ExamList = () => {
    // const { token } = useAuth();
    const auth = useSelector((state) => state.auth);
    const token = auth?.token;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [refetch, setRefetch] = useState(0);
    const {exams,loading} = useSelector((state) => state.auth);
    // const [exams, setExams] = useState([]);
    // const [dataNotFound, setDataNotFound] = useState(false);
    const handleExaView = (exam) => { navigate(`/teacher/exam/${exam._id}`, { state: { subject: exam.subjectName, notes: exam.notes, id: exam._id } }); }
    // const handleExaDelete = async (id) => {
    //     let x = confirm('Are you sure want to Delete Exam?');
    //     if (x) {
    //         const response = await deleteRequest(`dashboard/Teachers/deleteExam?id=${id}`, token);
    //         if (response?.statusCode === 200) {
    //             toast.success('Exam deleted  Successfully');
    //             setRefetch(refetch + 1);
    //         } else {
    //             toast.error(response?.message);
    //         }
    //     }
    // }
     const handleExaDelete = (id) => {
            let confirmDelete = confirm("Are you sure you want to delete this exam?");
            if (confirmDelete) {
                dispatch(deleteExam(id, token)); // ✅ Call delete action
            }
        };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await getRequest("dashboard/Teachers/viewExam", token);
    //         if (response?.statusCode === 200) {
    //             setExams(response.data)
    //             setDataNotFound(true);
    //         }
    //         else {
    //             console.log(response?.message);
    //             setDataNotFound(true);
    //         }
    //     }
    //     fetchData();
    // }, [refetch]);
       useEffect(() => {
            dispatch(fetchExams(token)); 
        }, [dispatch, token]);

    const tableData = useMemo(() => {
        return exams?.map((val) => ({
            Subject: val.subjectName,
            Email: val.email,
            Notes: val.notes.join(', '),
            'View Exam': <ButtonCom text='View Exam' onClick={() => handleExaView(val)} color='green' />,
            'Delete Exam': <ButtonCom text='Delete Exam' onClick={() => handleExaDelete(val._id)} color='red' />
        }));
    },[exams]);
    return (
        <div>
            <div style={{ maxWidth: "1100px", margin: "0px auto" }}>
                {/* <Table tableHeader={tableHeader} tableData={tableData} dataNotFound={dataNotFound} /> */}
                <Table tableHeader={tableHeader} tableData={tableData} />
            </div>
        </div>
    )
}

export default ExamList
