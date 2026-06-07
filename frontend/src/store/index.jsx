import { configureStore } from "@reduxjs/toolkit"
import registerSlice from "./modules/registerSlice"
import loginSlice from "./modules/loginSlice"
import settingSlice from "./modules/settingSilce"
import profileSlice from "./modules/profileSilce"
import articleSlice from "./modules/articleSlice"
import articleListSlice from "./modules/articleListSlice"
import commentSlice from "./modules/commentSlice"
import homeSilce from "./modules/homeSilce"
export default configureStore({
    //将仓库切片注册到大仓库
    reducer: {
        register: registerSlice,
        login: loginSlice,
        setting: settingSlice,
        profile: profileSlice,
        article: articleSlice,
        articleList: articleListSlice,
        comment: commentSlice,
        home: homeSilce,
    }
})