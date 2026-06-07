import { useDispatch, useSelector } from "react-redux";
import { getUserInfoOfSetting, userUpdate, removeUseless } from "../../store/modules/settingSilce";
import request from "../../request/index"
import { userAvatar } from "../../store/modules/loginSlice";
import { useEffect } from "react";
const SettingForm = () => {
    let { username, password, avatar, bio } = useSelector((state) => {
        return state.setting;
    })
    const dispatch = useDispatch();
    const update = async (e) => {
        e.preventDefault();
        try {
            let result = await request.user.update({ username, password, avatar, bio });
            console.log(result);
            if (password) {

            }
            dispatch(userUpdate(result))
            dispatch(userAvatar(result))
        } catch (error) {
            dispatch(userUpdate(error))
        }
    }
    useEffect(() => {
        return () => {
            dispatch(removeUseless())
        }
    }, [])
    const activate = (e) => {
        e.target.readOnly = false;
    }
    return (
        <form onSubmit={update}>
            <fieldset className="form-group">
                <input type="text" placeholder="用户名" className="form-control form-control-lg"
                    readOnly value={username} onChange={(e) => dispatch(getUserInfoOfSetting({ key: "username", value: e.target.value }))} />
            </fieldset>
            <fieldset className="form-group">
                <input type="password" placeholder="用户密码" className="form-control form-control-lg"
                    value={password} readOnly onDoubleClick={(e) => activate(e)} onChange={(e) => dispatch(getUserInfoOfSetting({ key: "password", value: e.target.value }))} />
            </fieldset>
            <fieldset className="form-group">
                <input type="text" placeholder="用户头像" className="form-control form-control-lg"
                    value={avatar || ""} onChange={(e) => dispatch(getUserInfoOfSetting({ key: "avatar", value: e.target.value }))} />
            </fieldset>
            <fieldset className="form-group">
                <textarea rows="6" placeholder="用户简介(必填项)" className="form-control form-control-lg"
                    value={bio || ""} onChange={(e) => dispatch(getUserInfoOfSetting({ key: "bio", value: e.target.value }))}></textarea>
            </fieldset>
            <button type="submit" className="btn btn-outline-success pull-xs-left">更新</button>
        </form >
    )
}
export default SettingForm;