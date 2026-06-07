import { memo } from "react";
const Pagination = memo((props) => {
    const LIMIT = 5;
    let { count, currentPage,onPageClick } = props;
    if (count <= LIMIT) {
        return null;
    }
    let pageNumList = [];
    for (let page = 1; page <= Math.ceil(count / LIMIT); page++) {
        pageNumList.push(page);
    }
    return (
        <nav>
            <ul>
                {
                    pageNumList.map(pageNum => {
                        const isCurrentPage = currentPage === pageNum;
                        return (
                            <li className={isCurrentPage ? "page-item active" : "page-item"} key={pageNum}>
                                <button type="button" className="page-link" onClick={() => {
                                    onPageClick(pageNum)
                                }}>{pageNum}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
})
export default Pagination;