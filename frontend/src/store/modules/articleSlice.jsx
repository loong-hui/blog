import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    description: "",
    body: "",
    tag: "",
    tags: [],
    error: null,
}
export const articleSlice = createSlice({//导出切片
    name: "article",
    initialState,
    reducers: {
        getArticleInfo: (state, action) => {
            let key = action.payload.key;
            let value = action.payload.value;
            state[key] = value
        },
        addArticleTag: (state) => {
            //设置一个bool值，如果存在重复为true，不存在重复的为false
            let bool = state.tags.every(tag => tag != state.tag);
            if (!bool || state.tag === "") {
                if (state.tag === "") {
                    return { ...state, tag: "", error: "标签不能为空" }

                }
                return { ...state, tag: "", error: "不能输入重复的标签" }
            }
            let tags = state.tags.concat([state.tag]);//通过数组的方法将tag拼接到tags
            return { ...state, tags, tag: "", error: "" }
        },
        removeArticleTag: (state, action) => {
            let removeTag = action.payload;
            let filterTags = state.tags.filter(tag => {
                return tag !== removeTag;
            })
            return { ...state, tags: filterTags }
        },
        createArticleAboutError: (state, action) => {
            state.error = action.payload;
        },
        removeUseless: () => {
            return { ...initialState }
        },
        storeCurrentArticle: (state, action) => {
            let status = action.payload.status;
            if (status == 1) {
                return { ...state, ...action.payload.data }
            } else {
                return { ...state, error: action.payload.message }
            }
        },
        deleteArticleAoutError: (state, action) => {
            state.error=action.payload;
        },
        favoriteArticle: (state, action) => {
            return {...state,...action.payload}
        },

    }
})
export const { getArticleInfo, addArticleTag, removeArticleTag, createArticleAboutError, removeUseless, storeCurrentArticle, deleteArticleAoutError, favoriteArticle } = articleSlice.actions;//导出切片的方法
export default articleSlice.reducer;//默认导出切片的属性