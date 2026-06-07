import { PureComponent } from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { getUserInfoOfComment, createComment, getAllCommentList, deleteComment } from "../../store/modules/commentSlice";
import Error from "../../components/Error/Error"
import CommentList from "./CommentList";
import { useEffect } from "react";
class Comment extends PureComponent {
    createCommemt = (e) => {
        e.preventDefault();
        let slug = this.props.slug;//书名
        let body = this.props.body;//评论内容
        this.props.createComment2({ slug, body });
        this.props.getAllCommentList2(slug);
        this.props.getAllCommentList2(slug);
    }
    componentDidMount() {
        let slug = this.props.slug;
        this.props.getAllCommentList2(slug);
    }
    deleteComment = (slug, id) => {
        this.props.deleteComment2({ slug, id })
    }
    render() {
        let { slug, commentList, currentUser, body, error } = this.props
        if (!currentUser) {
            return (
                <div>
                    <h2>未登录</h2>
                    <Link to={"/login"}>点击去登陆</Link>
                </div>
            )
        } else {
            return (
                <div className="col-md-8 offset-md-2 col-xs-12" >
                    <form className="card comment-form" onSubmit={this.createCommemt}>
                        <div className="card-block">
                            <textarea rows={3} className="form-control" placeholder="输入你的看法或意见" value={body} onChange={(e) => {
                                this.props.getUserInfoOfComment2({ key: "body", value: e.target.value })
                            }} />
                        </div>
                        <Error error={error}></Error>
                        <div className="card-footer">
                            <img className="comment-author-img" src={currentUser.avatar || "http://localhost:8000/default.png"} alt="" />
                            <button type="submit" className="btn btn-outline-info">提交</button>
                        </div>
                        <hr />
                        <CommentList commentList={commentList} currentUser={currentUser} slug={slug} deleteComment={this.deleteComment}></CommentList>
                    </form>

                </div >
            )
        }
    }
}
//返回指定切片的属性(通过解构的形式返回切片的属性)
const mapState = (state) => {
    return { ...state.comment }
}
//返回指定切片的方法(通过dispatch函数的参数调用切片的方法)
const mapDispatch = (dispatch) => ({
    getUserInfoOfComment2: (key, value) => dispatch(getUserInfoOfComment(key, value)),
    createComment2: ({ slug, body }) => dispatch(createComment({ slug, body })),
    getAllCommentList2: (slug) => dispatch(getAllCommentList(slug)),
    deleteComment2: ({ slug, id }) => dispatch(deleteComment({ slug, id })),
})
//导出connect(mapState, mapDispatch)(Comment)时，props会接收父组件传递的currentUser与slug 和 切片的属性与方法
export default connect(mapState, mapDispatch)(Comment);
//导出Comment组件时，props会接收从父组件传递的currentUser、slug
// export default Comment;
