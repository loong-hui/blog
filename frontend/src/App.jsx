import routes from "./routes"
import Header from "./components/Header"
import { useRoutes } from "react-router-dom"
import { Suspense, memo } from "react"
function App() {
  //路由出口(当使用路由懒加载时，需要设置路由出口)，并通过Suspense进行包裹，搭配fallback属性
  let element = useRoutes(routes)
  return (
    <>
      <Header></Header>
      <div>
        <Suspense fallback={<h2>Loading...</h2>}>
          {element}
        </Suspense>
      </div>
    </>
  )
}

export default memo(App)//在App外通过memo函数包裹
