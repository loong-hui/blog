import { memo } from "react";
import CommentItem from "./CommentItem"
function CommentList(props) {
    let { commentList, currentUser, deleteComment, slug } = props;
    if (commentList.length == 0) {
        return <div style={{ border: "5px solid #ffc400" }}>当前文章没有评论</div>
    } else {
        return (
            <div>
                {
                    commentList.map((comment) => {
                        if(comment.id){
                            return <CommentItem key={comment.id} comment={comment} currentUser={currentUser} slug={slug} deleteComment={deleteComment}></CommentItem>
                        }
                    })
                }
            </div>
        )
    }
}
export default memo(CommentList);