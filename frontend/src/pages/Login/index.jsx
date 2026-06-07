import { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/Error/Error";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfoOfLogin, StoreOrErrorAboutLogin, removeUseless } from "../../store/modules/loginSlice";
import request from "../../request/index"
const Login = memo(() => {
    let { email, password, error } = useSelector((state) => {
        return state.login;
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = async (e) => {
        e.preventDefault();
        try {
            let result = await request.user.login(email, password);
            // console.log(result);
            if (result.status == 1) {
                dispatch(StoreOrErrorAboutLogin(result))
                navigate("/");
            } else {
                dispatch(StoreOrErrorAboutLogin(result))
            }
        } catch (error) {
            dispatch(StoreOrErrorAboutLogin(error))
        }
    }
    useEffect(() => {
        return () => {
            dispatch(removeUseless())
        }
    }, [])
    return (
        <div className="container page">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h1 className="text-xs-center">登录</h1>
                    <p className="text-xs-center">
                        <Link to={"/register"}>不存在账号? 请去注册</Link>
                    </p>
                    <Error error={error}></Error>
                    <form onSubmit={login}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="用户邮箱" className="form-control form-control-lg"
                                value={email} onChange={(e) => dispatch(getUserInfoOfLogin({ key: "email", value: e.target.value }))} />
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="password" placeholder="用户密码" className="form-control form-control-lg"
                                value={password} onChange={(e) => dispatch(getUserInfoOfLogin({ key: "password", value: e.target.value }))} />
                        </fieldset>
                        <button type="submit" className="btn btn-success">登录</button>
                    </form>
                </div>
            </div>
        </div>
    )
})
export default Login;