import { PureComponent } from "react";
import { connect } from "react-redux";
import { getUserInfoOfComment, createComment, getAllCommentList } from "../../store/modules/commentSlice";
import Error from "../../components/Error/Error"

class Comment extends PureComponent {
    createCommemt = (e) => {
        e.preventDefault();
        let slug = this.props.slug;//书名
        let body = this.props.comment.body;//评论内容
        this.props.dispatch(createComment({ slug, body }));
    }
    componentDidMount() {
        // console.log(this.props);
        let slug = this.props.slug;
        if (slug) {
            this.props.dispatch(getAllCommentList(slug));
        }
    }
    render() {
        let { slug, currentUser } = this.props;
        let { commentList, body, error } = this.props.comment
        return (
            <div className="col-md-8 offset-md-2 col-xs-12" >
                <form className="card comment-form" onSubmit={this.createCommemt}>
                    <div className="card-block">
                        <textarea rows={3} className="form-control" placeholder="输入你的看法...." value={body || ""} onChange={(e) => {
                            this.props.dispatch(getUserInfoOfComment({ key: "body", value: e.target.value }))
                        }} />
                    </div>
                    <Error error={error}></Error>
                    <div className="card-footer">
                        <img className="comment-author-img" src={currentUser.avatar || "http://localhost:8000/default.png"} alt="" />
                        <button type="submit" className="btn btn-outline-info">提交</button>
                    </div>
                </form>
            </div>
        )
    }
}
//返回指定切片的属性(通过解构的形式返回切片的属性)
const mapState = (state) => {
    return state;
}
export default connect(mapState)(Comment);
