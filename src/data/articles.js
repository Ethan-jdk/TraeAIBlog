export const articles = [
  {
    id: 1,
    title: 'Vue 3 组合式 API 入门指南',
    summary: 'Vue 3 引入了组合式 API，让代码逻辑更加清晰和可复用。本文将详细介绍 setup 函数、ref、reactive 等核心概念。',
    content: `
# Vue 3 组合式 API 入门指南

Vue 3 的组合式 API 是一个强大的特性，它允许我们使用导入的函数而不是声明选项来编写 Vue 组件。

## 为什么选择组合式 API？

1. **更好的逻辑复用** - 可以将相关逻辑抽取到可复用的函数中
2. **更灵活的代码组织** - 可以按功能而不是选项类型来组织代码
3. **更好的类型推导** - 对 TypeScript 支持更友好

## 核心概念

### setup 函数

setup 是组合式 API 的入口点，在组件创建之前执行。

\`\`\`javascript
export default {
  setup() {
    // 组合式 API 代码
  }
}
\`\`\`

### ref 和 reactive

- ref：用于基本类型的响应式数据
- reactive：用于对象的响应式数据

### 生命周期钩子

组合式 API 提供了 onMounted、onUpdated、onUnmounted 等生命周期钩子。

## 总结

组合式 API 让 Vue 3 的开发体验更加灵活和强大，是构建大型应用的利器。
    `,
    author: '张三',
    date: '2024-01-15',
    category: '前端开发',
    tags: ['Vue3', 'JavaScript', '前端'],
    views: 1250,
    coverImage: 'https://picsum.photos/800/400?random=1'
  },
  {
    id: 2,
    title: 'Element Plus 组件库实战',
    summary: 'Element Plus 是 Vue 3 的优秀 UI 组件库，本文介绍如何在项目中快速集成和使用常用组件。',
    content: `
# Element Plus 组件库实战

Element Plus 是一套为开发者、设计师和产品经理准备的基于 Vue 3 的组件库。

## 安装

\`\`\`bash
npm install element-plus
\`\`\`

## 完整引入

\`\`\`javascript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
\`\`\`

## 常用组件

### Button 按钮

\`\`\`html
<el-button type="primary">主要按钮</el-button>
<el-button type="success">成功按钮</el-button>
\`\`\`

### Table 表格

\`\`\`html
<el-table :data="tableData">
  <el-table-column prop="name" label="姓名" />
  <el-table-column prop="age" label="年龄" />
</el-table>
\`\`\`

## 主题定制

Element Plus 支持通过 CSS 变量进行主题定制。
    `,
    author: '李四',
    date: '2024-01-18',
    category: '前端开发',
    tags: ['Element Plus', 'Vue3', 'UI组件'],
    views: 980,
    coverImage: 'https://picsum.photos/800/400?random=2'
  },
  {
    id: 3,
    title: 'JavaScript 异步编程详解',
    summary: '深入理解 Promise、async/await 等异步编程概念，掌握现代 JavaScript 异步处理技巧。',
    content: `
# JavaScript 异步编程详解

JavaScript 是单线程语言，异步编程是其核心特性之一。

## 回调函数

最早的异步处理方式，但容易导致回调地狱。

## Promise

Promise 是异步编程的一种解决方案，比回调函数更强大和灵活。

\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  // 异步操作
  if (success) {
    resolve(value)
  } else {
    reject(error)
  }
})
\`\`\`

## async/await

ES2017 引入的异步函数，让异步代码看起来像同步代码。

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
\`\`\`

## 总结

掌握异步编程是成为优秀前端工程师的必经之路。
    `,
    author: '王五',
    date: '2024-01-20',
    category: 'JavaScript',
    tags: ['JavaScript', '异步编程', 'Promise'],
    views: 1500,
    coverImage: 'https://picsum.photos/800/400?random=3'
  },
  {
    id: 4,
    title: 'CSS Grid 布局完全指南',
    summary: 'CSS Grid 是现代网页布局的利器，本文详细介绍 Grid 的各种属性和使用场景。',
    content: `
# CSS Grid 布局完全指南

CSS Grid 是一个二维布局系统，可以同时处理行和列。

## 基本概念

- 容器（Container）：应用 display: grid 的元素
- 项目（Item）：容器的直接子元素
- 行（Row）和列（Column）
- 单元格（Cell）

## 定义网格

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 100px auto 100px;
  gap: 20px;
}
\`\`\`

## 常用属性

- grid-column
- grid-row
- justify-items
- align-items

## 响应式布局

配合媒体查询，Grid 可以轻松实现响应式设计。
    `,
    author: '赵六',
    date: '2024-01-22',
    category: 'CSS',
    tags: ['CSS', 'Grid', '布局'],
    views: 1100,
    coverImage: 'https://picsum.photos/800/400?random=4'
  },
  {
    id: 5,
    title: 'TypeScript 高级类型技巧',
    summary: '探索 TypeScript 的高级类型系统，包括泛型、条件类型、映射类型等。',
    content: `
# TypeScript 高级类型技巧

TypeScript 的类型系统非常强大，本文介绍一些高级技巧。

## 泛型

泛型允许我们编写灵活的、可重用的代码。

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg
}
\`\`\`

## 条件类型

根据条件选择类型。

\`\`\`typescript
type IsString<T> = T extends string ? true : false
\`\`\`

## 映射类型

基于旧类型创建新类型。

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
\`\`\`

## 实用工具类型

TypeScript 提供了许多内置的工具类型。
    `,
    author: '钱七',
    date: '2024-01-25',
    category: 'TypeScript',
    tags: ['TypeScript', '类型系统'],
    views: 890,
    coverImage: 'https://picsum.photos/800/400?random=5'
  },
  {
    id: 6,
    title: '前端性能优化实践',
    summary: '从加载性能到运行时性能，全面提升前端应用的用户体验。',
    content: `
# 前端性能优化实践

性能优化是前端开发的重要课题。

## 加载性能

### 资源优化
- 图片压缩和懒加载
- 代码分割和懒加载
- 使用 CDN

### 缓存策略
- HTTP 缓存
- Service Worker
- 本地存储

## 运行时性能

### 减少重排重绘
- 使用 transform 和 opacity
- 批量修改 DOM

### JavaScript 优化
- 避免内存泄漏
- 使用 requestAnimationFrame

## 性能指标

- FCP (First Contentful Paint)
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
    `,
    author: '孙八',
    date: '2024-01-28',
    category: '性能优化',
    tags: ['性能', '优化', '前端'],
    views: 2000,
    coverImage: 'https://picsum.photos/800/400?random=6'
  }
]

export const categories = [
  '全部',
  '前端开发',
  'JavaScript',
  'CSS',
  'TypeScript',
  '性能优化',
  'Vue',
  'React'
]

export const tags = [
  'Vue3', 'JavaScript', '前端', 'Element Plus', 'UI组件',
  '异步编程', 'Promise', 'CSS', 'Grid', '布局',
  'TypeScript', '类型系统', '性能', '优化'
]
