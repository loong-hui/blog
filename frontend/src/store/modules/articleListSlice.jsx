import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    articleList: [],
    count: 0,
    currentPage: 1,
    tag: "",
    tags: [],
}
export const articleListSlice = createSlice({//导出切片
    name: "articleList",
    initialState,
    reducers: {
        getArticle: (state, action) => {
            state.articleList = action.payload.articles;
            state.count = action.payload.count;
        },
        syncCurrentPage:(state,action)=>{
            return {...state,currentPage:action.payload}
        }
    }
})
export const { getArticle, syncCurrentPage } = articleListSlice.actions;//导出切片的方法
export default articleListSlice.reducer;//默认导出切片的属性