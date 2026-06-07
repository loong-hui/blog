import { PureComponent } from "react"
import Banner from "./Banner";
import Tags from "./Tags";
import { connect } from "react-redux";
import { getAllTags } from "../../store/modules/homeSilce";
import Main from "./Main";
class Home extends PureComponent {
    componentDidMount(){
        this.props.dispatch(getAllTags());
    }
    render() {
        return (
            <div className="home-page">
                <Banner></Banner>
                <div className="container page">
                    <div className="row">
                        {/* 文章 */}
                        <div className="col-md-9">
                            <Main></Main>
                        </div>
                        {/* 标签 */}
                        <div className="col-md-3">
                            <div className="sidebar">
                                <p>热门标签</p>
                                <Tags tagList={this.props.tagList}></Tags>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapState = (state => {
    return { ...state.home }
})
export default connect(mapState)(Home);