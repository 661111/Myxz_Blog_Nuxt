<script setup lang="ts">
// 导入类型定义
import type { BangumiFollowResponse, CinemaFollowResponse, UserInfo } from '../types/Bangumi';

// 状态管理
const activeTab = ref<'bangumi' | 'cinema'>('bangumi');
const pending = ref(true);
const error = ref<string | null>(null);

// 数据存储
const bangumiList = ref<any[]>([]);
const cinemaList = ref<any[]>([]);
const userInfo = ref<UserInfo | null>(null);

// 获取认证信息（需要用户设置）
const getCredentials = () => {
  return {
    sessdata: useCookie('SESSDATA').value || '',
    biliJct: useCookie('bili_jct').value || '',
    buvid3: useCookie('BUVID3').value || ''
  };
};

// 获取追番列表
const fetchBangumiList = async () => {
  try {
    const { data } = await useFetch<BangumiFollowResponse>('/api/bililbilil/x/space/bangumi/follow/list?vmid=3546572553980802&type=1&pn=1&follow_status=0&limit=1', {
      headers: {
        'Cookie': `SESSDATA=${getCredentials().sessdata}; buvid3=${getCredentials().buvid3}`
      }
    });
    
    if (data.value?.code === 0) {
      bangumiList.value = data.value.list;
    } else {
      throw new Error(data.value?.message || '获取追番列表失败');
    }
  } catch (err) {
    error.value = `追番列表加载失败`;
  }
};

// 获取追剧列表
const fetchCinemaList = async () => {
  try {
    const { data } = await useFetch<CinemaFollowResponse>('/api/bililbilil/x/space/bangumi/follow/list?vmid=3546572553980802&type=2&pn=1&follow_status=0&limit=1', {
      headers: {
        'Cookie': `SESSDATA=${getCredentials().sessdata}; buvid3=${getCredentials().buvid3}`
      }
    });
    
    if (data.value?.code === 0) {
      cinemaList.value = data.value.list;
    } else {
      throw new Error(data.value?.message || '获取追剧列表失败');
    }
  } catch (err) {
    error.value = `追剧列表加载失败`;
  }
};

// 初始化加载数据
const loadData = async () => {
  pending.value = true;
  error.value = null;
  
  try {
    await Promise.all([
      fetchBangumiList(),
      fetchCinemaList()
    ]);
  } catch (err) {
    error.value = `数据加载失败: ${err.message}`;
  } finally {
    pending.value = false;
  }
};

// 刷新数据
const refresh = () => {
  loadData();
};

// 初始加载
onMounted(() => {
  loadData();
});

// 重新加载数据
const reloadData = async () => {
  // 清除缓存数据
  bangumiList.value = [];
  cinemaList.value = [];
  userInfo.value = null;
  
  // 重新加载
  await loadData();
};
</script>

<template>
  <div class="banguimContainer">
    <!-- 选项卡切换（主菜单） -->
    <div class="banguimNav">
      <button 
        :class="['NavItem JiEun', { active: activeTab === 'bangumi' }]" 
        @click="activeTab = 'bangumi'"
      >
        追番
      </button>
      <button 
        :class="['NavItem JiEun', { active: activeTab === 'cinema' }]" 
        @click="activeTab = 'cinema'"
      >
        追剧
      </button>
    </div>
    <!-- 加载状态 -->
    <div v-if="pending" class="loading">
        <div class="loading-ripple"></div>
    </div>

    <!-- 错误提示 -->
    <div v-else-if="error" class="error">
      <h3>加载失败</h3>
      <p>{{ error }}</p>
      <button @click="refresh">重试</button>
    </div>

    <div v-else class="banguimCard">
      <!-- 追番列表 -->
      <div v-if="activeTab === 'bangumi' && bangumiList.length > 0" class="banguimList">
        <div v-for="item in bangumiList" :key="item.season_id" class="banguimItem">
          <img :src="item.cover" alt="封面" class="banguimImage" />
          <div class="title">
            <a :href="item.url" target="_blank">
              {{ item.title }}
            </a>
          </div>
          <span class="dateSignpost">{{ item.publish.release_date }}</span>
          <span class="score" v-if="item.rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
            评分: {{ item.rating.score }}
          </span>
        </div>
        <div class="text">
          正在追({{ bangumiList.length }})部番剧
        </div>
        <div v-if="(activeTab === 'bangumi' && bangumiList.length === 0)" class="empty">
          <Icon name="ph:dropbox-logo-fill" />
        </div>
      </div>
      <!-- 追剧列表 -->
      <div v-if="activeTab === 'cinema' && cinemaList.length > 0" class="banguimList">
        <div v-for="item in cinemaList" :key="item.season_id" class="banguimItem">
          <img :src="item.cover" alt="封面" class="cover" />
          <div class="title">
            <a :href="item.url" target="_blank">
              {{ item.title }}
            </a>
          </div>
          <span class="score" v-if="item.rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
            评分: {{ item.rating.score }}
          </span>
          <span class="dateSignpost">{{ item.publish.release_date }}</span>
        </div>
      </div>
      <!-- 空状态 -->
      <div v-if="(activeTab === 'cinema' && cinemaList.length === 0)" class="empty">
        <Icon name="ph:dropbox-logo-fill" />
      </div>
    </div>
  </div>
</template>

<style lang="css"scoped>
/* 加载样式 */
.loading {
    display: flex;
    justify-content: center;
}
.loading-ripple {
    align-items: center;
    min-height: 50vh;
    display: inline-flex;
}
.loading-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}
.loading-ripple:after, .loading-ripple:before {
    position: absolute;
    border: 4px solid var(--db-main-color);
    content: "";
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0,.2,.8,1) infinite;
}
/* 错误样式 */
.error {
  text-align: center;
}
.error {
  text-align: center;
  padding: 40px;
  color: #666;
}
.error button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #00a1d6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
/* 全局样式表 */
:root {
    --banguim--edgelr: 3rem;
    --animation: opacity .5s var(--animation-in) backwards, transform 1s var(--animation-in) backwards, filter .7s var(--animation-in);
    --db--text-color: hsl(var(--thyuu--color-font) / var(--thyuu--alpha-font));
    --thyuu--color-font: 0deg 0% 20%;
    --thyuu--alpha-font: 100%;
}
:root {
	--db-main-color: hsl(var(--thyuu--main-color) / 70%);
	--db-hover-color: hsl(var(--thyuu--main-color) / 70%);
	--db--text-color: hsl(var(--thyuu--color-font) / var(--thyuu--alpha-font));
	--db--text-color-light: var(--thyuu--alpha-font);
	transition: .3s;
}
/* 顶部选项卡以及底部选项卡（未做）的样式表 */
.banguimNav {
    padding: 30px 0 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.banguimNav, .type {
    margin: 1em auto;
    padding: 0;
    width: fit-content;
}
.NavItem {
    font-size: 1em;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: .5s border-color;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    margin-right: 20px;
    color: var(--db--text-color);
}
.NavItem.current, .NavItem:hover {
    border-color: inherit;
}
.type {
    position: fixed;
    inset: auto var(--banguim--edgelr) 0;
    z-index: 3;
    flex-flow: row-reverse;
    animation: var(--animation);
    animation-delay: .5s;
}
/* 卡片框架样式 */
.banguimItem  {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-end;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 1em;
    gap: .5em;
    margin: 0;
    border-radius: var(--thyuu--size-radius);
    background: #000;
    overflow: hidden;
}
/* 卡片内容样式 */
.banguimContainer .banguimCard .banguimList, .db--dateList__card {
    position: relative;
    display: grid;
    grid: auto-flow min(var(--thyuu--size-card-normal)* 1.6, 70vw) / repeat(auto-fit, minmax(min(var(--thyuu--size-card-normal)* .9, 50% - 1em), 1fr));
    gap: .5em;
    width: 100%;
    height: 100%;
    overflow: hidden;
    animation: var(--animation);
    transition: .1s;
}
.banguimContainer .banguimCard .banguimItem {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
}
.banguimContainer .banguimCard .banguimItem {
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
}
/* 卡片图片样式 */
.banguimContainer .banguimCard .banguimImage {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 0;
    -webkit-mask: linear-gradient(#0006, #000c, #0000);
    transition: ease-in-out .3s;
    object-fit: cover;
    inset: 0;
}
/* 日期以及评分信息样式 */
.banguimContainer .banguimCard .dateSignpost, .banguimContainer .banguimCard .score {
    color: #ffffffb3;
    background: #ffffff1c;
    -webkit-backdrop-filter: saturate(1.8) blur(20px);
    backdrop-filter: saturate(1.8) blur(20px);
    font-size: var(--thyuu--size-small);
}
.banguimContainer .banguimCard .dateSignpost, .banguimContainer .banguimCard .score {
    position: relative;
    padding: .5em 1em;
    margin: 0;
    border-radius: 1em;
    line-height: 1;
    font-weight: 400;
    color: white;
    width: auto;
}
.banguimContainer .banguimCard .dateSignpost, .banguimContainer .banguimCard .score {
    position: relative;
    background: #f5c518;
    color: #000;
    border-radius: 4px;
    line-height: 1;
    padding: 3px 5px;
    font-size: 12px;
    display: flex;
    width: 58%;
    margin-bottom: 2px;
    font-weight: 900;
}
.banguimContainer .banguimCard .dateSignpost:after {
    all: unset;
    content: '标记';
    margin: 0 0 0 .5em;
}
/* 标题信息样式 */
.banguimContainer .banguimCard .title {
    order: -1;
    z-index: 1;
    flex: 100%;
}
.banguimContainer .banguimCard .title {
    position: relative;
    padding: .5em 1em;
    margin: 0;
    border-radius: 1em;
    line-height: 1;
    font-weight: 400;
    color: white;
    width: auto;
}
.title {
    margin-top: 2px;
    font-size: 14px;
    line-height: 1.4;
    color: var(--db--text-color);
}
.banguimContainer .banguimCard .title::before {
    content: "\e667";
    display: inline-block;
    text-indent: 0;
    margin: 0 .25em 0 0;
    rotate: 45deg;
    scale: .75;
    transition: rotate .5s;
}
.title a {
    color: hsl(var(--thyuu--main-color));
}
</style>