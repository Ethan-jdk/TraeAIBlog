<template>
  <div class="app" :class="{ 'dark-theme': isDark }">
    <NavBar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import NavBar from './components/layout/NavBar.vue'
import Footer from './components/layout/Footer.vue'
import { useTheme } from './composables/useTheme.js'

const { isDark, initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* CSS 变量定义 - 亮色模式 */
:root {
  --bg-color: #f5f7fa;
  --nav-bg-color: #ffffff;
  --card-bg-color: #ffffff;
  --text-color: #303133;
  --text-secondary: #606266;
  --text-muted: #909399;
  --border-color: #e4e7ed;
  --hover-bg-color: #f5f7fa;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

/* CSS 变量定义 - 暗色模式 */
html.dark,
.dark-theme {
  --bg-color: #0d1117;
  --nav-bg-color: #161b22;
  --card-bg-color: #21262d;
  --text-color: #f0f6fc;
  --text-secondary: #c9d1d9;
  --text-muted: #8b949e;
  --border-color: #30363d;
  --hover-bg-color: #30363d;
  --shadow-color: rgba(0, 0, 0, 0.5);

  /* Footer 暗色变量 */
  --footer-bg-color: #161b22;
  --footer-text-color: #f0f6fc;
  --footer-secondary-color: #c9d1d9;
  --footer-muted-color: #8b949e;
  --footer-border-color: #30363d;
}

body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  transition: background-color 0.3s;
}

.main-content {
  flex: 1;
  padding-top: 60px;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--border-color);
}

::-webkit-scrollbar-thumb {
  background: var(--text-muted);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

/* 全局链接样式 */
a {
  text-decoration: none;
  color: inherit;
}

/* 全局图片样式 */
img {
  max-width: 100%;
  height: auto;
}

/* Element Plus 暗黑模式覆盖 */
html.dark .el-card,
.dark-theme .el-card {
  background-color: var(--card-bg-color);
  border-color: var(--border-color);
  color: var(--text-color);
}

html.dark .el-input__wrapper,
.dark-theme .el-input__wrapper {
  background-color: var(--card-bg-color);
}

html.dark .el-button--default,
.dark-theme .el-button--default {
  background-color: var(--card-bg-color);
  border-color: var(--border-color);
  color: var(--text-color);
}

html.dark .el-empty__description,
.dark-theme .el-empty__description {
  color: var(--text-secondary);
}
</style>
