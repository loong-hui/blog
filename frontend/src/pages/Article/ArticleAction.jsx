import { Link, useNavigate } from "react-router-dom"
import { deleteArticleAoutError, favoriteArticle } from "../../store/modules/articleSlice";
import { useDispatch } from "react-redux";
import request from "../../request";
const ArticleAction = (props) => {
    const navigate = useNavigate();
    let { article, currentUser } = props;
    let { slug, author, favorited } = article;
    const dispatch = useDispatch();
    //删除文章
    const deleteArticleBySlug = async (slug) => {
        let result = await request.article.delete(slug);
        if (result.status == 1) {
            navigate("/profile/" + currentUser.username)
        } else {
            dispatch(deleteArticleAoutError(result.message))
        }
    }
    //喜欢文章
    const favoriteArticleBySlug = async (slug) => {
        let result = await request.article.favorite(slug);
        if (result.status == 1) {
            dispatch(favoriteArticle(result.data))
        }
    }
    //不喜欢文章
    const unfavoriteArticleBySlug = async (slug) => {
        let result = await request.article.unfavorite(slug);
        if (result.status == 1) {
            dispatch(favoriteArticle(result.data))
        }
    }
    if (currentUser) {//判断currentUser是否存在
        //防止author为null/undefined(如接口异常、数据未加载完成)时访问author.username导致报错
        const isMe = author && currentUser.username === author.username;
        if (isMe) {//是本人就编辑和删除文章
            return (
                <span>
                    <Link to={`/article/edit/${slug}`} className="btn btn-outline-success">编辑</Link>
                    <button onClick={() => {
                        deleteArticleBySlug(slug)
                    }} className="btn btn-outline-danger">删除</button>
                </span>
            )
        } else {//不是本人就喜欢和不喜欢文章
            return (
                <button onClick={() => {
                    if (favorited) {
                        unfavoriteArticleBySlug(slug)
                    } else {
                        favoriteArticleBySlug(slug)
                    }
                }} className={favorited ? "btn btn-outline-success" : "btn btn-outline-danger"}>
                    {favorited ? "不喜欢" : "喜欢"}<em className="iconfont icon-xihuan"></em>
                </button>
            )
        }
    } else {//不存在就登陆去
        return (
            <div>
                <button className="btn btn-outline-success" onClick={() => {
                    alert("请前去登录")
                }}>喜欢</button>
            </div>
        )
    }

}
export default ArticleAction;