import { memo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Menu = memo(() => {
    let { currentUser } = useSelector((state) => {
        return state.login
    })
    // console.log(currentUser);
    if (currentUser) {
        //登录
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">主页</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/article/create"} className="nav-link">写作</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/setting"} className="nav-link">设置</Link>
                </li>
                <li className="nav-item">
                    <Link to={`/profile/${currentUser.username}`} className="nav-link">
                        <img src={currentUser.avatar || "http://localhost:8000/default.png"} className="user-pic" alt="" />
                    </Link>
                </li>
            </ul>
        )
    } else {
        //未登录
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">主页</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/login"} className="nav-link">登录</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/register"} className="nav-link">注册</Link>
                </li>
            </ul>
        )
    }
})
export default Menu;