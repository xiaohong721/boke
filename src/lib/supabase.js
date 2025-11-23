import { createClient } from '@supabase/supabase-js'

// 从环境变量获取Supabase配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 如果环境变量缺失，使用占位符避免应用崩溃
const url = supabaseUrl || 'https://placeholder.supabase.co'
const key = supabaseKey || 'placeholder-key'

if (!supabaseUrl || !supabaseKey) {
  console.error('⚠️ Missing Supabase environment variables!')
  console.error('请在 Netlify 中设置环境变量：')
  console.error('- VITE_SUPABASE_URL')
  console.error('- VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(url, key)

