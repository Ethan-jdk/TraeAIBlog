<template>
  <div class="article-detail-page" v-if="article">
    <div class="article-header">
      <el-breadcrumb class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/articles' }">文章</el-breadcrumb-item>
        <el-breadcrumb-item>{{ article.title }}</el-breadcrumb-item>
      </el-breadcrumb>

      <h1 class="article-title">{{ article.title }}</h1>

      <div class="article-meta">
        <div class="meta-left">
          <span class="meta-item">
            <el-icon>
              <User />
            </el-icon>
            {{ article.author }}
          </span>
          <span class="meta-item">
            <el-icon>
              <Calendar />
            </el-icon>
            {{ article.date }}
          </span>
          <span class="meta-item">
            <el-icon>
              <View />
            </el-icon>
            {{ article.views }} 阅读
          </span>
        </div>
        <div class="meta-right">
          <el-tag type="primary">{{ article.category }}</el-tag>
        </div>
      </div>

      <div class="article-tags">
        <el-tag v-for="tag in article.tags" :key="tag" size="small" effect="plain" class="tag">
          {{ tag }}
        </el-tag>
      </div>
    </div>

    <div class="article-cover">
      <el-image :src="article.coverImage" fit="cover" class="cover-image">
        <template #error>
          <div class="image-placeholder">
            <el-icon :size="60">
              <Picture />
            </el-icon>
          </div>
        </template>
      </el-image>
    </div>

    <div class="article-content-wrapper">
      <div class="article-content">
        <div class="markdown-body" v-html="renderedContent"></div>
      </div>

      <div class="article-sidebar">
        <el-card class="author-card">
          <div class="author-info">
            <el-avatar :size="64" :icon="UserFilled" />
            <h4>{{ article.author }}</h4>
            <p>前端开发工程师</p>
          </div>
        </el-card>

        <el-card class="related-card">
          <template #header>
            <div class="card-header">
              <span>相关文章</span>
            </div>
          </template>
          <ul class="related-list">
            <li v-for="related in relatedArticles" :key="related.id" @click="goToArticle(related.id)">
              {{ related.title }}
            </li>
          </ul>
        </el-card>
      </div>
    </div>

    <div class="article-actions">
      <el-button @click="goBack">
        <el-icon>
          <Back />
        </el-icon>
        返回列表
      </el-button>
      <el-button type="primary" @click="scrollToTop">
        <el-icon>
          <Top />
        </el-icon>
        回到顶部
      </el-button>
    </div>
  </div>

  <div v-else class="not-found">
    <el-empty description="文章不存在">
      <el-button type="primary" @click="$router.push('/articles')">
        返回文章列表
      </el-button>
    </el-empty>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { User, Calendar, View, Picture, Back, Top, UserFilled } from '@element-plus/icons-vue'
import { articles } from '../data/articles.js'

const route = useRoute()
const router = useRouter()

const articleId = computed(() => parseInt(route.params.id))

const article = computed(() => {
  return articles.find(a => a.id === articleId.value)
})

const relatedArticles = computed(() => {
  if (!article.value) return []
  return articles.filter(a => a.id !== articleId.value && a.category === article.value.category).slice(0, 5)
})

const renderedContent = computed(() => {
  if (!article.value) return ''
  // 简单的 Markdown 渲染（实际项目中可以使用 marked 库）
  return article.value.content
    .replace(/# (.*)/, '<h1>$1</h1>')
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/- (.*)/g, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n/g, '<br>')
})

const goBack = () => {
  router.push('/articles')
}

const goToArticle = id => {
  router.push(`/article/${id}`)
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.article-detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.article-header {
  margin-bottom: 30px;
}

.breadcrumb {
  margin-bottom: 20px;
}

.article-title {
  font-size: 32px;
  font-weight: 700;
  color: #303133;
  line-height: 1.4;
  margin-bottom: 20px;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
}

.meta-left {
  display: flex;
  gap: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted, #909399);
  font-size: 14px;
}

.article-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.article-cover {
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
}

.cover-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.article-content-wrapper {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
}

.article-content {
  background: var(--card-bg-color, #fff);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 12px var(--shadow-color, rgba(0, 0, 0, 0.05));
}

.markdown-body {
  line-height: 1.8;
  color: var(--text-color, #303133);
}

.markdown-body :deep(h1) {
  font-size: 28px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--border-color, #e4e7ed);
  color: var(--text-color, #303133);
}

.markdown-body :deep(h2) {
  font-size: 24px;
  margin: 30px 0 15px;
  color: #409eff;
}

.markdown-body :deep(h3) {
  font-size: 20px;
  margin: 25px 0 12px;
  color: var(--text-color, #303133);
}

.markdown-body :deep(p) {
  margin-bottom: 16px;
  color: var(--text-secondary, #606266);
}

.markdown-body :deep(code) {
  background: var(--bg-color, #f5f7fa);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #e83e8c;
}

.markdown-body :deep(pre) {
  background: #282c34;
  color: #abb2bf;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
}

.markdown-body :deep(pre code) {
  background: transparent;
  color: inherit;
  padding: 0;
}

.markdown-body :deep(ul) {
  margin: 15px 0;
  padding-left: 25px;
}

.markdown-body :deep(li) {
  margin-bottom: 8px;
}

.article-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.author-card {
  text-align: center;
}

.author-info h4 {
  margin: 12px 0 4px;
  color: var(--text-color, #303133);
}

.author-info p {
  color: var(--text-muted, #909399);
  font-size: 14px;
  margin: 0;
}

.card-header {
  font-weight: 600;
  color: var(--text-color, #303133);
}

.related-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.related-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color, #e4e7ed);
  cursor: pointer;
  color: var(--text-secondary, #606266);
  transition: color 0.3s;
  font-size: 14px;
  line-height: 1.5;
}

.related-list li:last-child {
  border-bottom: none;
}

.related-list li:hover {
  color: #409eff;
}

.article-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #e4e7ed;
}

.not-found {
  padding: 100px 20px;
}

@media (max-width: 968px) {
  .article-content-wrapper {
    grid-template-columns: 1fr;
  }

  .article-sidebar {
    order: -1;
  }

  .cover-image,
  .image-placeholder {
    height: 250px;
  }

  .article-title {
    font-size: 24px;
  }

  .article-content {
    padding: 20px;
  }
}
</style>
