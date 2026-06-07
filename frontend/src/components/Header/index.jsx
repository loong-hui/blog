import { Component, PureComponent } from "react"
import { Link } from "react-router-dom"
import Menu from "./menu";
const currentUser={avatar:null};

class Header extends PureComponent {//将Component替换为PureComponent

    render() {
        return (
            <nav className="navbar navbar-light">
                <div className="container">
                    <Link to={"/"} className="navbar-brand">BLOG_V1</Link>
                    <Menu currentUser={null}></Menu>      
                </div> 
            </nav>
        )
    }
}
export default Header;