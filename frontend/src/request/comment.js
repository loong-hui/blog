import clientApi from "./clientApi";
export default {
    get: slug => clientApi.get(`/comments/${slug}`),
    create: (slug, body) => clientApi.post(`/comments/${slug}`, { comment: { body } }),
    delete: (slug, id) => clientApi.delete(`/comments/${slug}/${id}`),
}