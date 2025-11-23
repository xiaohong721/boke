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
      // 检查环境变量
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey) {
        console.error('环境变量未设置！请在 Netlify 中配置环境变量。')
        setLoading(false)
        return
      }

      // 获取所有博客文章（假设表名为 posts 或 position）
      const { data: postsData, error: postsError } = await supabase
        .from('职位')
        .select('*')
        .order('created_at', { ascending: false })

      // 获取所有分类
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('类别')
        .select('*')

      if (postsError) {
        console.error('获取文章错误:', postsError)
        throw postsError
      }
      if (categoriesError) {
        console.error('获取分类错误:', categoriesError)
        throw categoriesError
      }

      setPosts(postsData || [])
      setCategories(categoriesData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      // 即使出错也停止加载，显示空状态
    } finally {
      setLoading(false)
    }
  }

  // 检查环境变量
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="env-error">
        <div className="env-error-content">
          <h2>⚠️ 环境变量未配置</h2>
          <p><strong>重要提示：</strong>Vite 的环境变量在<strong>构建时</strong>注入，添加环境变量后<strong>必须重新部署</strong>才能生效！</p>
          <p>当前环境变量状态：</p>
          <ul>
            <li><strong>VITE_SUPABASE_URL</strong>: {supabaseUrl ? `已设置 (${supabaseUrl.substring(0, 30)}...)` : '❌ 未设置'}</li>
            <li><strong>VITE_SUPABASE_ANON_KEY</strong>: {supabaseKey ? `✅ 已设置 (${supabaseKey.substring(0, 20)}...)` : '❌ 未设置'}</li>
          </ul>
          <div className="env-error-steps">
            <h3>🔧 解决步骤（按顺序执行）：</h3>
            <ol>
              <li>登录 <a href="https://app.netlify.com" target="_blank" rel="noopener noreferrer">Netlify Dashboard</a></li>
              <li>进入你的网站项目</li>
              <li>点击 <strong>Site settings</strong> → <strong>Environment variables</strong></li>
              <li><strong>确认环境变量已添加：</strong>
                <ul>
                  <li>Key: <code>VITE_SUPABASE_URL</code>, Value: <code>https://gobttcgepiyckujzdakp.supabase.co</code></li>
                  <li>Key: <code>VITE_SUPABASE_ANON_KEY</code>, Value: <code>sb_publishable_xCnL6wI0soK72MOJfdRALw_j1SRzWDx</code></li>
                </ul>
              </li>
              <li><strong>⚠️ 关键步骤：重新部署网站</strong>
                <ul>
                  <li>返回网站 Dashboard</li>
                  <li>点击 <strong>"Deploys"</strong> 标签</li>
                  <li>点击 <strong>"Trigger deploy"</strong> → <strong>"Clear cache and deploy site"</strong></li>
                  <li>等待部署完成（1-3分钟）</li>
                </ul>
              </li>
              <li>部署完成后，刷新此页面</li>
            </ol>
            <div style={{marginTop: '1.5rem', padding: '1rem', background: '#e6fffa', borderRadius: '5px', border: '1px solid #38b2ac'}}>
              <strong>💡 为什么需要重新部署？</strong>
              <p style={{marginTop: '0.5rem', marginBottom: 0}}>
                Vite 在构建时将环境变量直接注入到代码中。如果只在 Netlify 中添加环境变量而不重新构建，代码中仍然没有这些值。
              </p>
            </div>
          </div>
        </div>
      </div>
    )
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

