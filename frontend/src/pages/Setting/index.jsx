import { memo } from "react";
import Error from "../../components/Error/Error";
import SettingForm from "./SettingForm";
import { useDispatch } from "react-redux";
import { userLogout } from "../../store/modules/settingSilce";
import { useNavigate } from "react-router-dom";
const Setting = memo(() => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const comeBack = () => {
        history.back();//回退上一步
    }
    const logout = () => {
        dispatch(userLogout());
        navigate("/login");
    }
    return (
        <div className="container page">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h1 className="text-xs-center">设置</h1>
                    <Error error={null}></Error>
                    <SettingForm></SettingForm>
                    <button type="button" className="btn btn-outline-success pull-xs-right" onClick={logout}>退出</button>
                    <button type="button" className="btn btn-outline-success pull-xs-right" onClick={comeBack}>返回</button>
                </div>
            </div>
        </div>
    )
})
export default Setting;