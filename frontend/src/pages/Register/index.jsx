import { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/Error/Error";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfoOfRegister, errorAboutRegister,removeUseless } from "../../store/modules/registerSlice";
import request from "../../request"
const Register = memo(() => {
    //从仓库中解构出用户的注册信息
    let { email, username, password, error } = useSelector((state) => {
        return state.register;
    })
    //获取操作仓库方法的对象
    const dispatch = useDispatch();
    //获取重定向的对象
    const navigate = useNavigate();
    //注册方法
    const register = async (e) => {
        e.preventDefault();
        try {            
            let result = await request.user.register({ email, username, password });
            if (result.status == 1) {
                //登陆成功，跳转到登陆页面
                navigate("/login");
            } else {
                //登陆失败(一般是用户信息错误)
                dispatch(registerToError(result.message))
            }
        } catch (error) {
            //异常失败(一般是用户信息错误)
            dispatch(errorAboutRegister(`异常错误: ${error.message}`))
        }
    }
    //生命周期
    useEffect(()=>{
        //初始化阶段 更新阶段
        return ()=>{
            //销毁阶段
            dispatch(removeUseless())
        }
    },[])
    return (
        <div className="container page">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h1 className="text-xs-center">注册</h1>
                    <p className="text-xs-center">
                        <Link to={"/login"}>存在账号? 直接去登陆</Link>
                    </p>
                    <Error error={error}></Error>
                    <form onSubmit={register}>
                        <fieldset className="form-group">
                            <input type="email" placeholder="用户邮箱" className="form-control form-control-lg"
                                value={email} onChange={(e) => dispatch(getUserInfoOfRegister({ key: "email", value: e.target.value }))} />
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="用户名" className="form-control form-control-lg"
                                value={username} onChange={(e) => dispatch(getUserInfoOfRegister({ key: "username", value: e.target.value }))} />
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="password" placeholder="用户密码" className="form-control form-control-lg"
                                value={password} onChange={(e) => dispatch(getUserInfoOfRegister({ key: "password", value: e.target.value }))} />
                        </fieldset>
                        <button type="submit" className="btn btn-success">注册</button>
                    </form>
                </div>
            </div>
        </div>
    )
})
export default Register;