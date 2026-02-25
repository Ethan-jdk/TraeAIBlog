<template>
  <el-header class="navbar">
    <div class="nav-container">
      <div class="logo" @click="$router.push('/')">
        <el-icon :size="28" color="#409EFF"><Document /></el-icon>
        <span class="logo-text">我的博客</span>
      </div>
      
      <el-menu
        :default-active="activeIndex"
        class="nav-menu"
        mode="horizontal"
        :ellipsis="false"
        router
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/articles">文章</el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>
      </el-menu>

      <div class="nav-right">
        <el-input
          v-model="searchQuery"
          placeholder="搜索文章..."
          class="search-input"
          :prefix-icon="Search"
          clearable
          @keyup.enter="handleSearch"
        />
        <el-button
          circle
          class="theme-btn"
          @click="toggleTheme"
          :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
        >
          <el-icon :size="18">
            <Sunny v-if="isDark" />
            <Moon v-else />
          </el-icon>
        </el-button>
      </div>
    </div>
  </el-header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Document, Search, Sunny, Moon } from '@element-plus/icons-vue'
import { useTheme } from '../../composables/useTheme.js'

const route = useRoute()
const router = useRouter()
const searchQuery = ref('')
const { isDark, toggleTheme } = useTheme()

const activeIndex = computed(() => route.path)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/articles',
      query: { search: searchQuery.value.trim() }
    })
  }
}
</script>

<style scoped>
.navbar {
  background-color: var(--nav-bg-color, #fff);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;
  transition: background-color 0.3s;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.logo:hover {
  opacity: 0.8;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-color, #303133);
  transition: color 0.3s;
}

.nav-menu {
  border-bottom: none;
  flex: 1;
  justify-content: center;
  margin: 0 40px;
  background-color: transparent;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-input {
  width: 200px;
}

.theme-btn {
  transition: all 0.3s;
}

.theme-btn:hover {
  transform: rotate(20deg);
}

:deep(.el-menu--horizontal) {
  border-bottom: none;
}

:deep(.el-menu--horizontal .el-menu-item) {
  color: var(--text-color, #303133);
}

:deep(.el-menu--horizontal .el-menu-item.is-active) {
  color: #409EFF;
}

:deep(.el-menu--horizontal .el-menu-item:hover) {
  background-color: var(--hover-bg-color, #f5f7fa);
}
</style>
