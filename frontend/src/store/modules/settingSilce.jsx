import { createSlice } from "@reduxjs/toolkit";
import { deleteData, getData, saveData } from "../../utils/localStore"
const initCurrentUser = () => {
    const currentUser = getData("currentUser");
    if (currentUser) {
        return currentUser;
    }
    return null;
}
const initialState = {
    ...initCurrentUser(),
    password: "",
    error: "",
    currentUser: initCurrentUser(),
}
export const settingSlice = createSlice({//导出切片
    name: "setting",
    initialState: initialState,
    reducers: {
        //获取注册使得用户信息
        getUserInfoOfSetting: (state, action) => {
            let key = action.payload.key;
            let value = action.payload.value;
            state[key] = value
        },
        //退出登录
        userLogout: () => {
            deleteData("currentUser");
            deleteData("token");
        },
        //更新用户信息
        userUpdate: (state, action) => {
            if (action.payload.status == 1) {
                let currentUser = action.payload.data;
                let token = action.payload.data.token;
                saveData("currentUser", currentUser);
                saveData("token", token);
                console.log(action.payload.data);
                console.log({...initCurrentUser()});
                state = { ...initCurrentUser(), ...state,}
            } else {
                state.error = action.payload.message;
            }
        },
        //设置页跳转,解决从登录页去往其他页后，登录页面的数据任然存在的问题
        removeUseless: () => {
            return { ...initialState, ...initCurrentUser(), currentUser: initCurrentUser() }
        },
    },
})
export const { getUserInfoOfSetting, userLogout, userUpdate,removeUseless } = settingSlice.actions;//导出切片的方法
export default settingSlice.reducer;//默认导出切片的属性