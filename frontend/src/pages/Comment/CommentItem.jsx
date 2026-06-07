import { memo } from "react";
function CommentItem(props) {
    let { comment, currentUser, deleteComment, slug } = props;
    //本人才能删除(其他用户没有删除功能)
    let isDeleteComment = currentUser && comment && currentUser.username == comment.userInfo.username;
    return (
        <div className="card" style={{ border: "5px solid #ffc400" }}>
            <div className="card-footer">
                <img className="comment-author-img" src={comment.userInfo.avatar || "http://localhost:8000/default.png"} alt="" />
                <span>{comment.userInfo.username}</span>
                {
                    isDeleteComment ? <button type="button" className="btn btn-outline-danger" onClick={() => deleteComment(slug, comment.id)}>删除</button> : null
                }
            </div>
            <div className="card-block bg-success" style={{ lineHeight: 4 }}>
                <p className="card-text">{comment.userInfo.username}的评论: {comment.body}</p>
            </div>

        </div>
    )
}
export default memo(CommentItem);