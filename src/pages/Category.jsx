import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './Category.css'

function Category() {
  const { id } = useParams()
  const [category, setCategory] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      // 获取分类信息
      const { data: categoryData, error: categoryError } = await supabase
        .from('类别')
        .select('*')
        .eq('id', id)
        .single()

      if (categoryError) throw categoryError
      setCategory(categoryData)

      // 获取该分类下的文章
      // 假设通过 post_categories 关联表或者直接在 posts 表中有 category_id
      const { data: postsData, error: postsError } = await supabase
        .from('职位')
        .select('*')
        .eq('类别_id', id)
        .order('created_at', { ascending: false })

      // 如果上面的查询没有结果，尝试通过关联表查询
      if (!postsData || postsData.length === 0) {
        const { data: postCategoriesData } = await supabase
          .from('post_categories')
          .select('*, 职位(*)')
          .eq('类别_id', id)

        if (postCategoriesData && postCategoriesData.length > 0) {
          const postsFromJoin = postCategoriesData.map(pc => pc.职位).filter(Boolean)
          setPosts(postsFromJoin)
        }
      } else {
        setPosts(postsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  if (!category) {
    return (
      <div className="error">
        <h2>分类未找到</h2>
        <Link to="/">返回首页</Link>
      </div>
    )
  }

  return (
    <div className="category-page">
      <Link to="/" className="back-link">← 返回首页</Link>
      
      <div className="category-header">
        <h1>{category.名字 || category.name}</h1>
        <p className="category-count">共 {posts.length} 篇文章</p>
      </div>

      <div className="posts-list">
        {posts.length === 0 ? (
          <p className="no-posts">该分类下暂无文章</p>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="post-item"
            >
              <h3>{post.标题 || post.title || post.名字 || post.name || '无标题'}</h3>
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
  )
}

export default Category

