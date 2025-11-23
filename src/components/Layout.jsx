import { Link } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <h1>我的博客</h1>
          </Link>
          <nav className="nav">
            <Link to="/">首页</Link>
            <Link to="/about">关于</Link>
          </nav>
        </div>
      </header>
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 个人博客. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout

