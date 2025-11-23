import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './PostDetail.css'

function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      // 获取文章详情
      const { data: postData, error: postError } = await supabase
        .from('职位')
        .select('*')
        .eq('id', id)
        .single()

      if (postError) throw postError

      setPost(postData)

      // 如果有分类ID，获取分类信息
      if (postData?.类别_id || postData?.category_id) {
        const categoryId = postData.类别_id || postData.category_id
        const { data: categoryData, error: categoryError } = await supabase
          .from('类别')
          .select('*')
          .eq('id', categoryId)
          .single()

        if (!categoryError && categoryData) {
          setCategory(categoryData)
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  if (!post) {
    return (
      <div className="error">
        <h2>文章未找到</h2>
        <Link to="/">返回首页</Link>
      </div>
    )
  }

  return (
    <div className="post-detail">
      <Link to="/" className="back-link">← 返回首页</Link>
      
      <article className="post-content">
        {category && (
          <Link to={`/category/${category.id}`} className="category-badge">
            {category.名字 || category.name}
          </Link>
        )}
        
        <h1>{post.标题 || post.title || post.名字 || post.name || '无标题'}</h1>
        
        <div className="post-meta">
          <span>发布时间: {new Date(post.created_at).toLocaleString('zh-CN')}</span>
        </div>

        <div className="post-body">
          <p>{post.内容 || post.content || post.描述 || post.description || '暂无内容'}</p>
        </div>
      </article>
    </div>
  )
}

export default PostDetail

