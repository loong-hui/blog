import Error from "../../components/Error/Error";
import { useDispatch, useSelector } from "react-redux";
import { getArticleInfo, addArticleTag, removeArticleTag, createArticleAboutError, removeUseless, storeCurrentArticle } from "../../store/modules/articleSlice";
import request from "../../request";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
const EditArticle = () => {
    let { title, description, body, tag, tags, error } = useSelector((state) => {
        return state.article
    })
    let dispatch = useDispatch();
    const addTag = (e) => {
        if (e.keyCode == 13) {
            //只有按回车键时才阻止默认行为(避免回车提交表单)，其他按键的默认输入行为正常保留
            e.preventDefault();
            dispatch(addArticleTag())
        }
    }
    const deleteTag = (tag) => {
        dispatch(removeArticleTag(tag))
    }
    const navigate = useNavigate();
    //通过文章名获取当前文章的数据，用于回显
    let { slug } = useParams();
    const getArticleBySlug = async (routeSlug) => {
        let result = await request.article.get(routeSlug);
        if (result.status == 1) {
            dispatch(storeCurrentArticle(result))
        }
    }
    const updateSubmit = async (e, article) => {
        e.preventDefault();
        try {
            let result = await request.article.update(article);
            console.log(result);
            if (result.status == 1) {
                navigate("/article/" + slug);
            } else {
                dispatch(createArticleAboutError(result.message))
            }
        } catch (error) {
            dispatch(createArticleAboutError(error.message))
        }
    }
    useEffect(() => {
        getArticleBySlug(slug);
        return () => {
            dispatch(removeUseless())
        }
    }, [])
    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">编辑文章</h1>
                        <Error error={error}></Error>
                        <form>
                            <fieldset className="form-group">
                                <input type="text" placeholder="文章标题" className="form-control form-control-lg"
                                    value={title} onChange={(e) => dispatch(getArticleInfo({ key: "title", value: e.target.value }))} />
                            </fieldset>
                            <fieldset className="form-group">
                                <input type="text" placeholder="文章描述" className="form-control form-control-lg"
                                    value={description} onChange={(e) => dispatch(getArticleInfo({ key: "description", value: e.target.value }))} />
                            </fieldset>
                            <fieldset className="form-group">
                                <textarea placeholder="使用markdown编辑文章" className="form-control form-control-lg" rows="8"
                                    value={body} onChange={(e) => dispatch(getArticleInfo({ key: "body", value: e.target.value }))} />
                            </fieldset>
                            <fieldset className="form-group">
                                <input type="text" placeholder="输入标签" className="form-control form-control-lg" onKeyDown={addTag}
                                    value={tag} onChange={(e) => dispatch(getArticleInfo({ key: "tag", value: e.target.value }))} />
                                {/* 显示所有标签 */}
                                {
                                    tags.map(tag => {
                                        return (
                                            <span key={tag} className="btn btn-outline-warning btn-sm">
                                                {tag}
                                                <em className="iconfont icon-denglong" onClick={() => deleteTag(tag)}></em>
                                            </span>
                                        )
                                    })
                                }
                            </fieldset>
                            {/* btn btn-outline-warning */}
                            <button className="btn btn-success" onClick={(e) => updateSubmit(e, { title, description, body, tag, tags,slug })}>发布文章</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditArticle;