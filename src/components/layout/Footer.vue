<template>
  <el-footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>关于博客</h4>
        <p>这是一个使用 Vue 3 + Element Plus 构建的个人博客网站，分享前端开发技术和学习心得。</p>
      </div>
      
      <div class="footer-section">
        <h4>快速链接</h4>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/articles">文章列表</router-link></li>
          <li><router-link to="/about">关于我</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4>联系方式</h4>
        <p>邮箱: blog@example.com</p>
        <p>GitHub: github.com/blog</p>
        <div class="social-links">
          <el-icon :size="20"><Position /></el-icon>
          <el-icon :size="20"><Message /></el-icon>
          <el-icon :size="20"><Share /></el-icon>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2024 我的博客. All rights reserved.</p>
    </div>
  </el-footer>
</template>

<script setup>
import { Position, Message, Share } from '@element-plus/icons-vue'
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: #fff;
  padding: 40px 20px 20px;
  height: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 30px;
}

.footer-section h4 {
  color: #409EFF;
  margin-bottom: 15px;
  font-size: 16px;
}

.footer-section p {
  color: #bdc3c7;
  line-height: 1.6;
  font-size: 14px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #409EFF;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}

.social-links .el-icon {
  cursor: pointer;
  transition: color 0.3s;
}

.social-links .el-icon:hover {
  color: #409EFF;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #34495e;
}

.footer-bottom p {
  color: #95a5a6;
  font-size: 14px;
}
</style>
