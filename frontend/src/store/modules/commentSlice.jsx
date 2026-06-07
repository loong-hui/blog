import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//createAsyncThunk可以在切片中可以执行异步的方法
import request from "../../request";
const initialState = {
    body: "",
    commentList: [],
    error: null,
}
export const createComment = createAsyncThunk("comment/create", async ({ slug, body }) => {
    if (!body || body == "") {
        return "评论信息不能为空";
    }
    let result = await request.comment.create(slug, body);
    return result.data;
})
export const getAllCommentList = createAsyncThunk("comment/getAll", async slug => {
    let result = await request.comment.get(slug);
    return result.data;
})
export const deleteComment = createAsyncThunk("comment/delete", async ({ slug, id }) => {
    await request.comment.delete(slug, id);
    return id;
})
export const commentSlice = createSlice({//导出切片
    name: "comment",
    initialState,
    reducers: {
        getUserInfoOfComment: (state, action) => {
            let key = action.payload.key;
            let value = action.payload.value;
            state[key] = value
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createComment.fulfilled, (state, action) => {
            if (action.payload == "评论信息不能为空") {
                return { ...state, error: action.payload }
            }
            const comment = action.payload.body;
            const commentList = state.commentList.concat([comment]);//将添加评论追加到数组后面
            return { ...state, commentList, error: null, body: "" }
        }).addCase(getAllCommentList.fulfilled, (state, action) => {
            let commentList = action.payload;
            return { ...state, commentList, body: "" }
        }).addCase(deleteComment.fulfilled, (state, action) => {
            let deleteId = action.payload;
            let commentList = state.commentList.filter(comment => {
                if (comment.id != deleteId) {
                    return comment;
                }
            })
            return { ...state, body: "", commentList }

        })
    }
})
export const { getUserInfoOfComment } = commentSlice.actions;//导出切片的方法
export default commentSlice.reducer;//默认导出切片的属性