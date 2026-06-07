import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../request";
const initialState = {
    count: 0,//标签个数
    currentPage: 1,//当前页码
    tab: "all",//标签
    tagList: [],//标签数组
    tag: "",//标签
    articleList: [],//
}
export const getAllTags = createAsyncThunk("home/getAll", async () => {
    let response = await request.tag.getAll();
    return response.data;
})
export const getArticleListByTagsOrTab = createAsyncThunk("home/getArticleListByTagsOrTab", async (msg, action) => {
    //第二个参数action包含许多对象和方法
    //action.getState().切片名类似函数组件useSelector(state=>state.切片名) 或 类组件const mapState=state=>{...state.切片名}
    let { tab, tag, currentPage } = action.getState().home;
    let result = {};
    if (tab) {
        if (tab == "all") {
            result = await request.article.getArticleList(currentPage);
        }
    }
    if (tag) {
        result = await request.article.getArticleListByTags(tag, currentPage);
    }
    return result.data;
})
export const homeSlice = createSlice({//导出切片
    name: "home",
    initialState: initialState,
    reducers: {
        syncTag: (state, action) => {
            return { ...state, tag: action.payload }
        },
        syncTab: (state, action) => {
            return { ...state, tab: action.payload }
        },
        syncCurrentPage: (state, action) => {
            return { ...state, currentPage: action.payload }
        },
        removeUseless: () => {
            return { ...initialState }
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllTags.fulfilled, (state, action) => {
            let tagList = action.payload;
            return { ...state, tagList }
        }).addCase(getArticleListByTagsOrTab.fulfilled, (state, action) => {
            if (action.payload) {
                let { articles } = action.payload;
                return { ...state, ...action.payload, articleList: articles }
            }
        })
    }
})
export const { syncTag, syncTab, syncCurrentPage, removeUseless } = homeSlice.actions;//导出切片的方法
export default homeSlice.reducer;//默认导出切片的属性