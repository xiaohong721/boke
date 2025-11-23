import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './Home.css'

function Home() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // 获取所有博客文章（假设表名为 posts 或 position）
      const { data: postsData, error: postsError } = await supabase
        .from('职位')
        .select('*')
        .order('created_at', { ascending: false })

      // 获取所有分类
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('类别')
        .select('*')

      if (postsError) throw postsError
      if (categoriesError) throw categoriesError

      setPosts(postsData || [])
      setCategories(categoriesData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="home">
      <div className="hero">
        <h2>欢迎来到我的博客</h2>
        <p>分享技术、生活与思考</p>
      </div>

      <div className="categories-section">
        <h3>分类</h3>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="category-card"
            >
              <h4>{category.名字 || category.name}</h4>
            </Link>
          ))}
        </div>
      </div>

      <div className="posts-section">
        <h3>最新文章</h3>
        <div className="posts-grid">
          {posts.length === 0 ? (
            <p className="no-posts">暂无文章</p>
          ) : (
            posts.map((post) => (
              <Link
                key={post.id}
                to={`/post/${post.id}`}
                className="post-card"
              >
                <h4>{post.标题 || post.title || post.名字 || post.name || '无标题'}</h4>
                <p className="post-excerpt">
                  {post.内容 || post.content || post.描述 || post.description || '暂无内容'}
                </p>
                <div className="post-meta">
                  <span>{new Date(post.created_at).toLocaleDateString('zh-CN')}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Home

