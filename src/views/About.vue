<template>
  <div class="about-page">
    <div class="about-header">
      <h1 class="page-title">关于我</h1>
      <p class="page-subtitle">热爱技术，热爱生活</p>
    </div>

    <div class="about-content">
      <el-row :gutter="30">
        <el-col :xs="24" :md="8">
          <el-card class="profile-card">
            <div class="profile-header">
              <el-avatar :size="120" :icon="UserFilled" class="profile-avatar" />
              <h2 class="profile-name">博主名称</h2>
              <p class="profile-title">前端开发工程师</p>
            </div>

            <div class="profile-stats">
              <div class="stat-item">
                <div class="stat-value">{{ articles.length }}</div>
                <div class="stat-label">文章</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ totalViews }}</div>
                <div class="stat-label">阅读</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">3</div>
                <div class="stat-label">年经验</div>
              </div>
            </div>

            <div class="profile-social">
              <el-button circle><el-icon>
                  <Position />
                </el-icon></el-button>
              <el-button circle><el-icon>
                  <Message />
                </el-icon></el-button>
              <el-button circle><el-icon>
                  <Share />
                </el-icon></el-button>
            </div>
          </el-card>
        </el-col>

        <el-col :xs="24" :md="16">
          <el-card class="info-card">
            <template #header>
              <div class="card-header">
                <el-icon>
                  <User />
                </el-icon>
                <span>个人简介</span>
              </div>
            </template>
            <p class="intro-text">
              大家好，我是一名热爱前端开发的工程师。这个博客是我用来记录学习心得、分享技术经验的地方。
            </p>
            <p class="intro-text">
              我专注于 Vue.js 生态系统的开发，同时也对 React、TypeScript、Node.js 等技术有深入的研究。
              希望通过这个博客，能够帮助到更多正在学习前端开发的朋友。
            </p>
            <p class="intro-text">
              除了编程，我还喜欢阅读、摄影和旅行。我相信技术让生活更美好，而分享让技术更有价值。
            </p>
          </el-card>

          <el-card class="skills-card">
            <template #header>
              <div class="card-header">
                <el-icon>
                  <Tools />
                </el-icon>
                <span>技术栈</span>
              </div>
            </template>
            <div class="skills-grid">
              <div v-for="skill in skills" :key="skill.name" class="skill-item">
                <div class="skill-info">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <el-progress :percentage="skill.level" :color="skill.color" :stroke-width="8" :show-text="false" />
              </div>
            </div>
          </el-card>

          <el-card class="timeline-card">
            <template #header>
              <div class="card-header">
                <el-icon>
                  <Calendar />
                </el-icon>
                <span>经历时间线</span>
              </div>
            </template>
            <el-timeline>
              <el-timeline-item v-for="(item, index) in timeline" :key="index" :type="item.type" :color="item.color" :timestamp="item.time">
                <h4>{{ item.title }}</h4>
                <p>{{ item.content }}</p>
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { User, UserFilled, Position, Message, Share, Tools, Calendar } from '@element-plus/icons-vue'
import { articles } from '../data/articles.js'

const totalViews = computed(() => {
  return articles.reduce((sum, article) => sum + article.views, 0)
})

const skills = [
  { name: 'Vue.js', level: 90, color: '#42b883' },
  { name: 'JavaScript', level: 85, color: '#f7df1e' },
  { name: 'TypeScript', level: 80, color: '#3178c6' },
  { name: 'HTML/CSS', level: 88, color: '#e34c26' },
  { name: 'Node.js', level: 75, color: '#339933' },
  { name: 'React', level: 70, color: '#61dafb' }
]

const timeline = [
  {
    time: '2024-01',
    title: '创建个人博客',
    content: '使用 Vue 3 + Element Plus 搭建了这个博客网站，开始记录技术学习历程。',
    type: 'primary',
    color: '#409EFF'
  },
  {
    time: '2023-06',
    title: '高级前端工程师',
    content: '晋升为高级前端工程师，负责团队技术选型和项目架构设计。',
    type: 'success',
    color: '#67C23A'
  },
  {
    time: '2022-03',
    title: '加入互联网公司',
    content: '加入一家知名互联网公司，参与大型前端项目的开发。',
    type: 'warning',
    color: '#E6A23C'
  },
  {
    time: '2021-07',
    title: '前端开发工程师',
    content: '毕业后正式成为前端开发工程师，开始职业生涯。',
    type: 'info',
    color: '#909399'
  }
]
</script>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.about-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 18px;
  color: #909399;
}

.profile-card {
  text-align: center;
  margin-bottom: 20px;
}

.profile-header {
  padding: 20px 0;
}

.profile-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-size: 48px;
}

.profile-name {
  margin: 16px 0 4px;
  font-size: 24px;
  color: #303133;
}

.profile-title {
  color: #909399;
  font-size: 14px;
  margin: 0;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  border-top: 1px solid #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
  margin: 20px 0;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #409eff;
}

.stat-label {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.profile-social {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.info-card,
.skills-card,
.timeline-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #303133;
}

.intro-text {
  color: #606266;
  line-height: 1.8;
  margin-bottom: 16px;
}

.intro-text:last-child {
  margin-bottom: 0;
}

.skills-grid {
  display: grid;
  gap: 20px;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.skill-name {
  font-weight: 500;
  color: #303133;
}

.skill-level {
  color: #909399;
  font-size: 14px;
}

:deep(.el-timeline-item__content h4) {
  margin: 0 0 8px;
  color: #303133;
}

:deep(.el-timeline-item__content p) {
  margin: 0;
  color: #606266;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .profile-card {
    margin-bottom: 20px;
  }
}
</style>
