import clientApi from "./clientApi";
export default {//导出用户的api
    getAll:()=>clientApi.get("/tags"),
}