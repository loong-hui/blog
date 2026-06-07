import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import request from "../../request";
import { setProfileInfo, followAndUnfollow } from "../../store/modules/profileSilce";
import { useEffect, useState } from "react";
import ButtonInfo from "./ButtonInfo";
import { getArticle } from "../../store/modules/articleListSlice";
import ArticleList from "../ArticleList";
import { syncCurrentPage } from "../../store/modules/articleListSlice";
const Profile = () => {
    //获取地址栏的用户名(可能是自己，也可能是别人)
    let { username } = useParams();
    //shallowEqual判断“新状态和旧状态是否相同”，避免无意义的状态更新(类似memo和PureComponent)，主要用于useSelector()
    let profile = useSelector((state) => {
        return state.profile;
    }, shallowEqual)
    const dispatch = useDispatch();
    //获取用户信息
    const getUserInfo = () => {
        request.user.get(username).then(res => {
            // console.log(res);
            if (res.status == 1) {
                dispatch(setProfileInfo(res.data))
            } else {
                dispatch(setProfileInfo(res.message))
            }
        }).catch(error => {
            dispatch(setProfileInfo(error))
        })
    }
    useEffect(() => {
        getUserInfo();
        getAuthorArticle();
        return () => { }
    }, [username, profile.username])//第一个是解决在关注其他人的页面时，点击个人头像无法跳转回个人的问题，第二个是后面文章的问题

    let currentUser = useSelector((state) => {
        return state.login.currentUser;
    })
    //判断是否是本人(本人显示编辑，他人显示关注/取消关注)
    let isCurrentUser = currentUser && currentUser.username === profile.username;
    //关注
    const follow = () => {
        try {
            request.user.follow(username).then(res => {
                dispatch(followAndUnfollow(res.data))
            })
        } catch (error) {
            dispatch(followAndUnfollow(error))
        }
    }
    //取消关注
    const unfollow = async () => {
        try {
            let result = await request.user.unfollow(username);
            dispatch(followAndUnfollow(result.data))
        } catch (error) {
            dispatch(followAndUnfollow(error))
        }
    }
    //获取作者自己的文章
    const getAuthorArticle = (pageNum=1) => {
        request.article.getArticleByAuthor(username, pageNum).then(res => {
            if (res.status == 1) {
                dispatch(getArticle(res.data))
            }
        })
    }
    //获取喜欢的文章
    const getFavotiteArticle = async (pageNum=1) => {
        let result = await request.article.getArticleByFavorite(username,pageNum);
        if (result.status == 1) {
            dispatch(getArticle(result.data))
        }
    }
    const [activeFlag, setActiveFlag] = useState("author");
    let articleList = useSelector((state) => {
        return state.articleList;
    }, shallowEqual)
    const onPageClick=(pageNum)=>{
        dispatch(syncCurrentPage(pageNum));
        if(activeFlag=="author"){
            getAuthorArticle(pageNum);
        }else if(activeFlag=="favorite"){
            getFavotiteArticle(pageNum)
        }
    }
    return (
        <div className="profile-page">
            {/* 用户信息=头像+名字+简介+行为 */}
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 offset-md-12 col-xs-12">
                            {/* 头像+名字+简介 */}
                            <img src={profile.avatar || "http://localhost:8000/default.png"} style={{ width: 100 }} alt="" />
                            <h2>{profile.username}</h2>
                            <p>{profile.bio}</p>
                            {/* 行为(看主页=自己是编辑，替他人是关注/取消关注) */}
                            <ButtonInfo profile={profile} isCurrentUser={isCurrentUser} follow={follow} unfollow={unfollow}></ButtonInfo>
                        </div>
                    </div>
                </div>
            </div>
            {/* 用户文章=自己的文章+喜欢/关注的文章 */}
            <div className="container">
                <div className="row">
                    <div className="col-md-12 offset-md-12 col-xs-12">
                        {/* 选项卡 */}
                        <div className="articles-toggle">
                            <ul className="nav navbar-nav">
                                <li className="nav nav-item">
                                    <button className={activeFlag == "author" ? "btn btn-outline-success active" : "btn btn-outline-success"} onClick={() => {
                                        setActiveFlag("author")
                                        getAuthorArticle()
                                    }}>我的文章</button>
                                </li>
                                <li className="nav nav-item">
                                    <button className={activeFlag == "favorite" ? "btn btn-outline-success active" : "btn btn-outline-success"} onClick={() => {
                                        setActiveFlag("favorite")
                                        getFavotiteArticle()
                                    }}>关注的人</button>
                                </li>
                            </ul>
                        </div>
                        <br />
                        {/* 文章列表 */}
                        <ArticleList articleList={articleList.articleList} count={articleList.count} currentPage={articleList.currentPage} isShowPage={true} onPageClick={onPageClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;