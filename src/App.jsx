import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Category from './pages/Category'
import About from './pages/About'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  )
}

export default App

