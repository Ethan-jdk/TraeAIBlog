<template>
  <div class="article-list-page">
    <div class="page-header">
      <h1 class="page-title">文章列表</h1>
      <p class="page-subtitle">共 {{ filteredArticles.length }} 篇文章</p>
    </div>

    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-group">
          <span class="filter-label">分类：</span>
          <el-radio-group v-model="selectedCategory" size="small">
            <el-radio-button v-for="cat in categories" :key="cat" :label="cat">
              {{ cat }}
            </el-radio-button>
          </el-radio-group>
        </div>

        <div class="filter-group">
          <span class="filter-label">排序：</span>
          <el-select v-model="sortBy" size="small" style="width: 120px">
            <el-option label="最新发布" value="date" />
            <el-option label="最多阅读" value="views" />
          </el-select>
        </div>
      </div>

      <div v-if="searchQuery" class="search-info">
        <el-tag closable @close="clearSearch">
          搜索：{{ searchQuery }}
        </el-tag>
      </div>
    </div>

    <el-row :gutter="20">
      <el-col v-for="article in paginatedArticles" :key="article.id" :xs="24" :sm="12" :md="8">
        <ArticleCard :article="article" />
      </el-col>
    </el-row>

    <div v-if="filteredArticles.length === 0" class="empty-state">
      <el-empty description="暂无文章" />
    </div>

    <div v-if="filteredArticles.length > pageSize" class="pagination-wrapper">
      <el-pagination :current-page="currentPage" @update:current-page="currentPage = $event" :page-size="pageSize" @update:page-size="pageSize = $event" :total="filteredArticles.length" :page-sizes="[6, 9, 12, 24]" layout="total, sizes, prev, pager, next" background />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArticleCard from '../components/ArticleCard.vue'
import { articles, categories } from '../data/articles.js'

const route = useRoute()
const router = useRouter()

const selectedCategory = ref('全部')
const sortBy = ref('date')
const currentPage = ref(1)
const pageSize = ref(9)
const searchQuery = ref('')

onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = route.query.category
  }
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
})

watch(
  () => route.query,
  newQuery => {
    if (newQuery.category) {
      selectedCategory.value = newQuery.category
    }
    if (newQuery.search) {
      searchQuery.value = newQuery.search
    }
  }
)

const filteredArticles = computed(() => {
  let result = [...articles]

  // 分类筛选
  if (selectedCategory.value !== '全部') {
    result = result.filter(article => article.category === selectedCategory.value)
  }

  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(article => article.title.toLowerCase().includes(query) || article.summary.toLowerCase().includes(query) || article.tags.some(tag => tag.toLowerCase().includes(query)))
  }

  // 排序
  if (sortBy.value === 'date') {
    result.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else if (sortBy.value === 'views') {
    result.sort((a, b) => b.views - a.views)
  }

  return result
})

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredArticles.value.slice(start, end)
})

const clearSearch = () => {
  searchQuery.value = ''
  router.push({ path: '/articles' })
}
</script>

<style scoped>
.article-list-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  color: var(--text-color, #303133);
  margin-bottom: 8px;
}

.page-subtitle {
  color: var(--text-muted, #909399);
  font-size: 14px;
}

.filter-section {
  background: var(--card-bg-color, #fff);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 12px var(--shadow-color, rgba(0, 0, 0, 0.05));
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-label {
  font-size: 14px;
  color: var(--text-secondary, #606266);
  white-space: nowrap;
}

.search-info {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--border-color, #e4e7ed);
}

.empty-state {
  padding: 60px 0;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-group {
    width: 100%;
  }

  :deep(.el-radio-group) {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
