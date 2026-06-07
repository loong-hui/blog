//错误组件，当用户登录或注册出现错误时进行信息提示
const Error=({error})=>{
    if(!error){
        return;
    }
    return(
        <ul className="error-messages">
            <li>{error}</li>
        </ul>
    )
}
export default Error;