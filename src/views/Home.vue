<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">探索技术的无限可能</h1>
        <p class="hero-subtitle">分享前端开发经验，记录学习成长历程</p>
        <div class="hero-actions">
          <el-button type="primary" size="large" @click="$router.push('/articles')">
            浏览文章
          </el-button>
          <el-button size="large" plain @click="$router.push('/about')">
            了解更多
          </el-button>
        </div>
      </div>
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-number">{{ articles.length }}</div>
          <div class="stat-label">文章</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ categories.length - 1 }}</div>
          <div class="stat-label">分类</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ totalViews }}</div>
          <div class="stat-label">阅读</div>
        </div>
      </div>
    </section>

    <!-- Featured Articles -->
    <section class="featured-section">
      <div class="section-header">
        <h2 class="section-title">
          <el-icon>
            <Star />
          </el-icon>
          精选文章
        </h2>
        <router-link to="/articles" class="view-all">
          查看全部 <el-icon>
            <ArrowRight />
          </el-icon>
        </router-link>
      </div>

      <el-row :gutter="20">
        <el-col v-for="article in featuredArticles" :key="article.id" :xs="24" :sm="12" :md="8">
          <ArticleCard :article="article" />
        </el-col>
      </el-row>
    </section>

    <!-- Categories -->
    <section class="categories-section">
      <div class="section-header">
        <h2 class="section-title">
          <el-icon>
            <Folder />
          </el-icon>
          文章分类
        </h2>
      </div>

      <div class="categories-grid">
        <div v-for="category in categories.slice(1)" :key="category" class="category-card" @click="filterByCategory(category)">
          <el-icon :size="32">
            <Document />
          </el-icon>
          <span class="category-name">{{ category }}</span>
          <span class="category-count">{{ getCategoryCount(category) }} 篇</span>
        </div>
      </div>
    </section>

    <!-- Latest Articles -->
    <section class="latest-section">
      <div class="section-header">
        <h2 class="section-title">
          <el-icon>
            <Timer />
          </el-icon>
          最新文章
        </h2>
      </div>

      <el-row :gutter="20">
        <el-col v-for="article in latestArticles" :key="article.id" :xs="24" :sm="12" :md="8">
          <ArticleCard :article="article" />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Star, ArrowRight, Folder, Document, Timer } from '@element-plus/icons-vue'
import ArticleCard from '../components/ArticleCard.vue'
import { articles, categories } from '../data/articles.js'

const router = useRouter()

const featuredArticles = computed(() => articles.slice(0, 3))

const latestArticles = computed(() => {
  return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
})

const totalViews = computed(() => {
  return articles.reduce((sum, article) => sum + article.views, 0)
})

const getCategoryCount = category => {
  return articles.filter(article => article.category === category).length
}

const filterByCategory = category => {
  router.push({
    path: '/articles',
    query: { category }
  })
}
</script>

<style scoped>
.home {
  padding-bottom: 40px;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 80px 20px 60px;
  text-align: center;
  margin-bottom: 40px;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 20px;
  opacity: 0.9;
  margin-bottom: 30px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 50px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
}

.featured-section,
.categories-section,
.latest-section {
  max-width: 1200px;
  margin: 0 auto 50px;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color, #303133);
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.view-all {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.view-all:hover {
  color: #66b1ff;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.category-card {
  background: var(--card-bg-color, #fff);
  border-radius: 8px;
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid var(--border-color, #e4e7ed);
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: #409eff;
}

.category-card .el-icon {
  color: #409eff;
  margin-bottom: 12px;
}

.category-name {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color, #303133);
  margin-bottom: 4px;
}

.category-count {
  font-size: 13px;
  color: var(--text-muted, #909399);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-stats {
    gap: 30px;
  }

  .stat-number {
    font-size: 28px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
