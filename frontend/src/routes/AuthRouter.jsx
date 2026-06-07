import { getData } from "../utils/localStore";
import { Navigate } from "react-router-dom"
function AuthRouter(props) {
    const token = getData("token");
    if (token) {
        return <>{props.children}</>
    } else {
        alert("请先登录");
        return <Navigate to={"/login"}></Navigate>
    }
}
export default AuthRouter;