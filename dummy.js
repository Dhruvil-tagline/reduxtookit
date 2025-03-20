import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { errorObj, userObj } from "../../StaticData/staticObj";
import { validateEmail, validatePassword } from "../../utils/validation";
import InputCom from "../../CommonComponent/InputCom";
import ButtonCom from "../../CommonComponent/ButtonCom";
import Loader from "../../CommonComponent/Loader";
import { loginUser } from "../../action/authAction";

const Login = () => {
    const [user, setUser] = useState(userObj);
    const [error, setError] = useState(errorObj);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const errors = {};
        errors.emailError = validateEmail(user.email);
        errors.passwordError = validatePassword(user.password);
        setError(errors);
        return Object.values(errors).every((val) => !val);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(errorObj);
        if (validate()) {
            dispatch(loginUser(user, navigate));
        }
    };

    return (
        <div className="authContainer">
            {loading && <Loader />}
            <div className="authInnerDiv">
                <form onSubmit={handleSubmit} className="form">
                    <h1 className="authHeading">Login</h1>

                    <label htmlFor="email">Email:</label>
                    <span className="error">{error.emailError}</span>
                    <InputCom type="email" value={user.email} onChange={handleChange} id="email" name="email" />

                    <label htmlFor="password">Password:</label>
                    <span className="error">{error.passwordError}</span>
                    <InputCom type="password" value={user.password} onChange={handleChange} id="password" name="password" />

                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <ButtonCom text="Submit" type="submit" />
                    </div>

                    <p>
                        <Link to="/forgetPassword" style={{ textDecoration: "underline" }}>Forget password</Link>
                    </p>

                    <p style={{ marginLeft: "20px" }}>
                        If you are not signed up yet? <Link to="/signup" style={{ textDecoration: "underline" }}>Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
