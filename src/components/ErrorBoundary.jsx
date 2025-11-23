import { Component } from 'react'
import './ErrorBoundary.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h1>⚠️ 应用加载出错</h1>
            <p>很抱歉，应用遇到了问题。请检查以下内容：</p>
            <ul>
              <li>浏览器控制台是否有错误信息</li>
              <li>Netlify 环境变量是否已正确设置</li>
              <li>Supabase 连接是否正常</li>
            </ul>
            <button onClick={() => window.location.reload()}>
              刷新页面
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

