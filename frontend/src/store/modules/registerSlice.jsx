import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    email: "",
    username: "",
    password: "",
    error: "",
}
export const registerSlice = createSlice({//导出切片
    name: "register",
    initialState: initialState,
    reducers: {
        //获取注册使得用户信息
        getUserInfoOfRegister: (state, action) => {
            let key = action.payload.key;
            let value = action.payload.value;
            state[key] = value
        },
        //注册时出现错误时，弹出的提示信息
        errorAboutRegister: (state, action) => {
            state.error = action.payload;
        },
        //解决从注册页去往其他页后，注册页面的数据任然存在的问题
        //return返回的是store的state的新状态，替换掉自己内部保存的旧状态；
        removeUseless: () => {
            return {...initialState}
        },
    },
})
export const { getUserInfoOfRegister, errorAboutRegister, removeUseless } = registerSlice.actions;//导出切片的方法
export default registerSlice.reducer;//默认导出切片的属性