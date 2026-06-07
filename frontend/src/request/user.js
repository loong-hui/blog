import clientApi from "./clientApi";
export default {//导出用户的api
    register: (user) => clientApi.post("/users", { user }),
    login: (email, password) => clientApi.post("/users/login", { user: { email, password } }),
    get: (username) => clientApi.get("/users/" + username),
    update: (user) => clientApi.put("/users", { user }),
    follow: (username) => clientApi.post("/follow/" + username),
    unfollow: (username) => clientApi.delete("/follow/" + username),
}