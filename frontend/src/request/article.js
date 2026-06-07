import clientApi from "./clientApi";
const LIMIT = 5;
const OFFSET = page => {
    return (page - 1) * LIMIT;
};
export default {//导出用户的api
    //创建文章
    create: article => clientApi.post("/articles", { article }),
    get: slug => clientApi.get("/articles/" + slug),
    update: article => clientApi.put("/articles/" + article.slug, { article }),
    delete: slug => clientApi.delete("/articles/" + slug),
    favorite: slug => clientApi.post("/favorites/" + slug),
    unfavorite: slug => clientApi.delete("/favorites/" + slug),
    getArticleByAuthor: (author, page) => clientApi.get(`/articles?author=${author}&limit=${LIMIT}&offset=${OFFSET(page)}`),
    getArticleByFavorite: (favorite, page) => clientApi.get(`/articles?favorite=${favorite}&limit=${LIMIT}&offset=${OFFSET(page)}`),
    // --新增api--
    getArticleList: (page) => clientApi.get(`/articles?limit=${LIMIT}&offset=${OFFSET(page)}`),
    getArticleListByTags: (tag, page) => clientApi.get(`/articles?tag=${tag}&limit=${LIMIT}&offset=${OFFSET(page)}`),

}