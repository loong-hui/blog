import { memo, PureComponent } from "react";
import ArticleList from "../ArticleList";
import { connect } from "react-redux";
import { syncTag, syncTab, syncCurrentPage, getArticleListByTagsOrTab, removeUseless } from "../../store/modules/homeSilce";
import { getData } from "../../utils/localStore";
const AllButton = memo(props => {
    let { tab, currentUser, onTabClick } = props;
    if (!currentUser) {
        return null;
    } else {
        return (
            // nav-item
            <li className="nav-item">
                <button type="button" onClick={(e) => {
                    e.preventDefault();
                    onTabClick("all", 1);
                }} className={tab == "all" ? "btn btn-outline-info active" : "btn btn-outline-info"}>全部</button>
            </li>
        )
    }
})
const OtherButton = memo(props => {
    let { tag, currentUser } = props;
    if (!currentUser) {
        return null;
    } else {
        if (tag) {
            return (
                // 
                <li className="nav-item">
                    <button type="button" onClick={(e) => {
                        e.preventDefault();
                    }} className={tag ? "btn btn-outline-info active" : "btn btn-outline-info"}>{tag}</button>
                </li>
            )
        } else {//点击全部按钮后，tag为其他的按钮将消失
            return null;
        }

    }
})
class Main extends PureComponent {
    onTabClick = (tab, page) => {
        this.props.dispatch(syncTag(null));
        this.props.dispatch(syncTab(tab));
        this.props.dispatch(syncCurrentPage(page));
        this.props.dispatch(getArticleListByTagsOrTab());
    }
    onPageClick = (page) => {
        this.props.dispatch(syncCurrentPage(page));
        this.props.dispatch(getArticleListByTagsOrTab());
    }
    render() {
        return (
            <>
                {/* 选项卡 */}
                <div className="feet-toggle">
                    <ul className="nav navbar-nav">
                        <AllButton tab={this.props.tab} currentUser={this.props.currentUser} onTabClick={this.onTabClick}></AllButton>
                        <OtherButton tag={this.props.tag} currentUser={this.props.currentUser}></OtherButton>
                    </ul>
                </div><br /><br />
                {/* 显示文章列表 */}
                <ArticleList articleList={this.props.articleList} count={this.props.count} currentPage={this.props.currentPage} isShowPage={true} onPageClick={this.onPageClick} ></ArticleList>
            </>
        )
    }
    componentDidMount() {
        //刚登录后跳转到主页时从切片中获取的currentUser为null，需要从本地存储中获取，否则登陆成功后不会显示数据
        let currentUser = getData("currentUser");
        if (currentUser) {
            this.props.dispatch(syncTab("all"));
            this.props.dispatch(syncCurrentPage(1));
            this.props.dispatch(getArticleListByTagsOrTab());
        }
    }
    componentWillUnmount() {
        this.props.dispatch(removeUseless())
    }
}
const mapState = state => {
    return {
        ...state.home,
        ...state.login,
    }
}
export default connect(mapState)(Main);