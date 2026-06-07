import { memo } from "react"
import { useDispatch } from "react-redux";
import { getArticleListByTagsOrTab, syncCurrentPage, syncTab, syncTag } from "../../store/modules/homeSilce";
import { getData } from "../../utils/localStore";
const Tags = (props) => {
    let { tagList } = props;
    let dispatch=useDispatch();
    let currentUser=getData("currentUser")
    if(currentUser){
if (tagList && tagList.length != 0) {
        return (
            <div>
                {
                    tagList.map(tag => {
                        return (
                            <span key={tag} className="btn btn-outline-warning btn-sm" onClick={()=>{
                                dispatch(syncTab(null));
                                dispatch(syncTag(tag));
                                dispatch(syncCurrentPage(1));
                                dispatch(getArticleListByTagsOrTab());
                            }}>{tag}</span>
                        )
                    })
                }
            </div>
        )
    } else {
        return <div>标签正在加载中...</div>
    }
    }else {
        return <div>未登录...</div>
    }
    
}
export default memo(Tags);