<template>
  <el-card class="article-card" :body-style="{ padding: '0px' }" shadow="hover">
    <div class="article-cover" @click="goToDetail">
      <el-image :src="article.coverImage" fit="cover" class="cover-image">
        <template #error>
          <div class="image-placeholder">
            <el-icon :size="40">
              <Picture />
            </el-icon>
          </div>
        </template>
      </el-image>
      <div class="category-tag">{{ article.category }}</div>
    </div>

    <div class="article-content">
      <h3 class="article-title" @click="goToDetail">{{ article.title }}</h3>
      <p class="article-summary">{{ article.summary }}</p>

      <div class="article-meta">
        <div class="meta-left">
          <span class="author">
            <el-icon>
              <User />
            </el-icon>
            {{ article.author }}
          </span>
          <span class="date">
            <el-icon>
              <Calendar />
            </el-icon>
            {{ article.date }}
          </span>
        </div>
        <div class="meta-right">
          <span class="views">
            <el-icon>
              <View />
            </el-icon>
            {{ article.views }}
          </span>
        </div>
      </div>

      <div class="article-tags">
        <el-tag v-for="tag in article.tags.slice(0, 3)" :key="tag" size="small" effect="plain" class="tag">
          {{ tag }}
        </el-tag>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Picture, User, Calendar, View } from '@element-plus/icons-vue'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const goToDetail = () => {
  router.push(`/article/${props.article.id}`)
}
</script>

<style scoped>
.article-card {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.article-cover {
  position: relative;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
}

.cover-image {
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
}

.article-cover:hover .cover-image {
  transform: scale(1.05);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.category-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: #409eff;
  color: #fff;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
}

.article-content {
  padding: 20px;
}

.article-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color, #303133);
  margin: 0 0 12px 0;
  line-height: 1.4;
  cursor: pointer;
  transition: color 0.3s;
}

.article-title:hover {
  color: #409eff;
}

.article-summary {
  font-size: 14px;
  color: var(--text-secondary, #606266);
  line-height: 1.6;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 13px;
  color: var(--text-muted, #909399);
}

.meta-left {
  display: flex;
  gap: 16px;
}

.meta-left span,
.meta-right span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.article-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  cursor: pointer;
}

.tag:hover {
  color: #409eff;
  border-color: #409eff;
}
</style>
