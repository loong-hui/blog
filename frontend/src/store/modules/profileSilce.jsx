import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    avatar: "",
    bio: "",
    error: null,
    following: false,
    followers: [],
}
export const profileSlice = createSlice({//导出切片
    name: "profile",
    initialState,
    reducers: {
        setProfileInfo: (state, action) => {
            return { ...state, ...action.payload }
        },
        followAndUnfollow: (state, action) => {
            return {...state,...action.payload};
        },
    }
})
export const { setProfileInfo, followAndUnfollow } = profileSlice.actions;//导出切片的方法
export default profileSlice.reducer;//默认导出切片的属性