import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthProvider';
import { getRequest } from '../../utils/api';
import { useSelector } from 'react-redux';

const Protected = ({ children }) => {
    const auth = useSelector((val) => val.auth);
    // const { token, removeToken } = useAuth();

    const getToken = async () => {
        let response = await getRequest('users/newPassword', auth?.token)
        if (response?.statusCode !== 200) {
            // removeToken();
        }
    }
    useEffect(() => {
        // token && getToken();
        auth?.token && getToken();
    }, []);
    // return ((!!token ? children : <Navigate to='/login' />))
    return ((!!auth?.token ? children : <Navigate to='/login' />))
}

export default Protected
