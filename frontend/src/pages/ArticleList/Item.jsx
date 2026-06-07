import { Link } from "react-router-dom";
const favorite_class = "btn btn-outline-success";
const unfavorite_class = "btn btn-outline-danger";
const Item = ({ article }) => {
    return (
        <div className="article-preview">
            {/* 文章的元数据 */}
            <div className="article-meta">
                {/* 点击头像跳转到作者的个人信息 */}
                <Link to={`/profile/${article.author.username}`}>
                    <img src={article.author.avatar||"http://localhost:8000/default.png"} alt="" />
                </Link>
                {/* 点击作者姓名跳转到作者的个人信息 */}
                <Link to={`/profile/${article.author.username}`}>
                    <p>作者: {article.author.username}</p>
                </Link>
                {/* 动态渲染喜欢按钮 */}
                <div className="pull-xs-right">
                    <button className={article.favorited ? unfavorite_class : favorite_class}>
                        <em className="iconfont icon-xihuan"></em>{article.favoriteCount}
                    </button>
                </div>
            </div>
            {/* 文章基本信息，点击后跳转到文章的详情页 */}
            <div className="preview-link">
                <h6>标题: {article.title}</h6>
                <p>{article.description}</p>
                <Link to={"/article/" + article.slug}>阅读更多</Link>
                <div>
                    {
                        article.tags.map(tag => {
                            return (
                                <span key={tag} className="btn btn-outline-warning btn-sm">
                                    {tag}
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Item;