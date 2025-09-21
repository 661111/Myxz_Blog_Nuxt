<template>
  <div class="container">
    <h1>我的豆瓣数据</h1>
    
    <div v-if="loading" class="loading">加载中...</div>
    
    <div v-else>
      <!-- 用户信息 -->
      <div v-if="userInfo" class="user-section">
        <h2>用户信息</h2>
        <div class="user-card">
          <img :src="userInfo.avatar" :alt="userInfo.name" class="avatar">
          <div class="user-details">
            <h3>{{ userInfo.name }}</h3>
            <p v-if="userInfo.desc">{{ userInfo.desc }}</p>
            <p v-if="userInfo.loc">所在地: {{ userInfo.loc.name }}</p>
          </div>
        </div>
      </div>

      <!-- 图书收藏 -->
      <div v-if="books.length" class="section">
        <h2>读过的书 ({{ books.length }})</h2>
        <div class="items-grid">
          <div v-for="book in books" :key="book.id" class="item-card">
            <img 
              :src="book.images?.medium || book.image" 
              :alt="book.title" 
              class="item-image"
            >
            <div class="item-details">
              <h3>{{ book.title }}</h3>
              <p v-if="book.rating">评分: {{ book.rating.value }}/{{ book.rating.max }}</p>
              <p v-if="book.author">作者: {{ book.author.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 电影收藏 -->
      <div v-if="movies.length" class="section">
        <h2>看过的电影 ({{ movies.length }})</h2>
        <div class="items-grid">
          <div v-for="movie in movies" :key="movie.id" class="item-card">
            <img 
              :src="movie.images?.medium" 
              :alt="movie.title" 
              class="item-image"
            >
            <div class="item-details">
              <h3>{{ movie.title }}</h3>
              <p v-if="movie.rating">评分: {{ movie.rating.value }}/{{ movie.rating.max }}</p>
              <p v-if="movie.genres">类型: {{ movie.genres.join(', ') }}</p>
              <p v-if="movie.year">年份: {{ movie.year }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 音乐收藏 -->
      <div v-if="music.length" class="section">
        <h2>听过的音乐 ({{ music.length }})</h2>
        <div class="items-grid">
          <div v-for="item in music" :key="item.id" class="item-card">
            <img 
              :src="item.images?.medium || item.image" 
              :alt="item.title" 
              class="item-image"
            >
            <div class="item-details">
              <h3>{{ item.title }}</h3>
              <p v-if="item.rating">评分: {{ item.rating.value }}/{{ item.rating.max }}</p>
              <p v-if="item.attrs?.singer">歌手: {{ item.attrs.singer.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { DoubanBook, DoubanMovie, DoubanMusic, DoubanUser } from '../types/douban'

// 响应式数据
const userInfo = ref<DoubanUser | null>(null)
const books = ref<DoubanBook[]>([])
const movies = ref<DoubanMovie[]>([])
const music = ref<DoubanMusic[]>([])
const loading = ref(true)

// 获取豆瓣API方法
const { 
  getUserInfo, 
  getUserBooks, 
  getUserMovies, 
  getUserMusic 
} = useDoubanApi()

// 加载数据
onMounted(async () => {
  try {
    loading.value = true
    
    // 并行获取所有数据
    const [userData, booksData, moviesData, musicData] = await Promise.allSettled([
      getUserInfo(),
      getUserBooks(),
      getUserMovies(),
      getUserMusic()
    ])

    if (userData.status === 'fulfilled') {
      userInfo.value = userData.value
    }

    if (booksData.status === 'fulfilled') {
      books.value = booksData.value.books || []
    }

    if (moviesData.status === 'fulfilled') {
      movies.value = moviesData.value.subjects || []
    }

    if (musicData.status === 'fulfilled') {
      music.value = musicData.value.musics || []
    }

  } catch (error) {
    console.error('获取豆瓣数据失败:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.user-section {
  margin-bottom: 40px;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.user-details h3 {
  margin: 0 0 10px 0;
}

.section {
  margin-bottom: 40px;
}

.section h2 {
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.item-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.item-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.item-details {
  padding: 15px;
}

.item-details h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  line-height: 1.4;
}

.item-details p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}
</style>