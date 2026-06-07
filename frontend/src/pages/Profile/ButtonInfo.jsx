import { Link } from "react-router-dom";

const ButtonInfo = props => {
    const { profile, isCurrentUser,follow,unfollow } = props;
    const hangdle=()=>{
        if(profile.following){
            unfollow();
        }else{
            follow();
        }
    }
    if (isCurrentUser) {//是用户本身
        return (
            <Link className="btn btn-outline-info" to={"/setting"}>
                编辑 <em className="iconfont icon-all"></em>
            </Link>
        )
    } else {
        return (
            <button onClick={hangdle} className={profile.following?"btn btn-outline-success":"btn btn-outline-danger"}>
                {profile.following ? "取消关注" : "关注"}<em className="iconfont icon-xihuan"></em>
            </button>
        )
    }
}
export default ButtonInfo;