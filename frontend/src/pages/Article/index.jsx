import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import request from "../../request";
import { removeUseless, storeCurrentArticle } from "../../store/modules/articleSlice";
import { useDispatch, useSelector } from "react-redux";
import ArticleAction from "./ArticleAction";
import { marked } from "marked"
import Comment from "../Comment";
const Article = () => {
    //获取当前文章名,通过文章名获取文章信息(在初始化时执行)
    let { slug } = useParams();
    let dispatch = useDispatch();
    const getArticleBySlug = async (routeSlug) => {
        let result = await request.article.get(routeSlug);
        // console.log(result);
        dispatch(storeCurrentArticle(result))
    }
    useEffect(() => {
        getArticleBySlug(slug);
        return () => {
            dispatch(removeUseless())
        }
    }, [])
    const article = useSelector(state => {
        return state.article;
    })
    const currentUser = useSelector(state => {
        return state.login.currentUser;
    })
    let { title, description, body, tags, author, avatar, } = article;
    if (!body) {
        return null;
    }
    //使用marked
    const markData = body;
    //对输出的HTML进行净化
    const markHTML = marked.parse(markData, { sanitize: true });
    const markObj = { __html: markHTML };
    return (
        <div className="article-page">
            {/* 文章信息=头像+名字+按钮 */}
            <div className="banner">
                <div className="container">
                    <h3>{article.title}</h3>
                    <div className="article-meta">
                        <div className="info">
                            <Link to={`/profile/${author && author.username}`}>
                                <img src={(author) && author.avatar || "http://localhost:8000/default.png"} alt="" />
                            </Link>
                        </div>
                        <div className="info">
                            <Link to={`/profile/${author && author.username}`}>
                                {author && author.username}
                            </Link>
                        </div>
                        <ArticleAction article={article} currentUser={currentUser}></ArticleAction>
                    </div>
                </div>
            </div>
            {/* 文章主体=body+description */}
            <div className="article-content container">
                <div className="col-xs-10">
                    {/* body */}
                    <div dangerouslySetInnerHTML={markObj}></div>
                    {/* tags */}
                    <ul className="tag-list">
                        {
                            tags.map(tag => {
                                return <li key={tag} className="btn btn-outline-warning btn-sm">{tag}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
            {/* 文章评论 */}
            <Comment currentUser={currentUser} slug={slug} ></Comment>
        </div>
    )
}
export default Article;