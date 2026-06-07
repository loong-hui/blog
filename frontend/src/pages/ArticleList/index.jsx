import Item from "./Item";
import Pagination from "./pagination";
const ArticleList = props => {
    let { articleList, count, currentPage, isShowPage, onPageClick } = props;
    if (!articleList) {
        return <div>正在加载中</div>
    }
    if (articleList && articleList.length == 0) {
        return <div>此处没有文章</div>
    }
    return (
        <div>
            {
                (articleList).map(article => {
                    return <Item key={article.slug} article={article} />
                })
            }
            {isShowPage ? <Pagination count={count} currentPage={currentPage} onPageClick={onPageClick} /> : null}
        </div>
    )

}
export default ArticleList;