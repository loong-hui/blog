import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
//引入浏览器路由模式
import { BrowserRouter } from "react-router-dom"
//引入仓库
import { Provider } from "react-redux"
import store from './store/index.jsx'
//关闭React Router未来版本警告
if (process.env.NODE_ENV === 'development') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args.some(arg => arg?.includes('React Router Future Flag Warning'))) return;
    originalWarn(...args);
  };
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 将仓库注册到App中 */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
