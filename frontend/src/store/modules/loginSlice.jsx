import { createSlice } from "@reduxjs/toolkit";
import { getData, saveData } from "../../utils/localStore"
const initCurrentUser = () => {
    const currentUser = getData("currentUser");
    if (currentUser) {
        return currentUser;
    }
    return null;
}
const initialState = {
    email: "",
    username: "",
    password: "",
    error: "",
    currentUser: initCurrentUser(),
    token: null,
}
export const loginSlice = createSlice({//导出切片
    name: "login",
    initialState: initialState,
    reducers: {
        //获取登录使得用户信息
        getUserInfoOfLogin: (state, action) => {
            let key = action.payload.key;
            let value = action.payload.value;
            state[key] = value
        },
        //登录时出现错误时，弹出的提示信息
        StoreOrErrorAboutLogin: (state, action) => {
            let { status, message, data } = action.payload;
            if (status === 1) {
                let currentUser = data;
                let token = data.token;
                saveData("currentUser", currentUser);
                saveData("token", token);
                return { ...state, ...data, error: null }
            } else {
                return { ...state, error: message }
            }
        },
        //登录页跳转,解决从登录页去往其他页后，登录页面的数据任然存在的问题
        removeUseless: () => {
            return { ...initialState, currentUser: initCurrentUser() }
        },
        //需要将实时更新图片的函数放在登录切片中，因为菜单组件的currentUser是从login切片中获取的(因为切片之间是相互独立的)
        userAvatar: (state) => {
            console.log(initCurrentUser());
            state.currentUser = initCurrentUser();
        }
    },
})
export const { getUserInfoOfLogin, StoreOrErrorAboutLogin, removeUseless,userAvatar } = loginSlice.actions;//导出切片的方法
export default loginSlice.reducer;//默认导出切片的属性