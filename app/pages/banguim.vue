<!-- pages/user-collection.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Bangumi 收藏管理</h1>

    <div v-if="loading">加载中...</div>
    <div v-else-if="error">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {{ error.message }}
      </div>
    </div>
    <div v-else>
      <div class="flex flex-wrap -mx-2 mb-6">
        <div v-for="type in collectionTypes" :key="type" class="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
          <NuxtLink
            :to="`/user-collection/${$route.params.username}/${type}`"
            class="block bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
          >
            <div class="p-4">
              <h2 class="text-xl font-semibold text-center">{{ typeLabel[type] }}</h2>
              <p class="text-gray-600 text-center mt-2">
                {{ stats[type]?.total || 0 }} 项收藏
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div v-if="currentType" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in items" :key="item.id" class="bg-white rounded-lg overflow-hidden shadow-md">
          
          <div class="p-4">
            <h3 class="text-xl font-semibold mb-2">
              {{ item.subject.name_cn || item.subject.name }}
            </h3>
            <div class="flex items-center mb-3">
              <span
                class="inline-block px-3 py-1 mr-2 rounded-full text-xs"
                :class="statusClass[item.status.status]"
              >
                {{ statusLabel[item.status.status] }}
              </span>
              <span class="text-gray-600 text-sm">
                评分：{{ item.status.rating || '-' }}
              </span>
            </div>
            <p class="text-gray-700 text-sm line-clamp-3">
              {{ item.subject.summary }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-6 space-x-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          上一页
        </button>
        <span class="px-4 py-2 bg-gray-100 text-gray-700 rounded">
          第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
        </span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCollections } from "../composables/useBangumi";
import type { CollectionItem, CollectionsResponse } from "~/types/banguim";

const route = useRoute();
const router = useRouter();
const username = route.params.username as string;

const collectionTypes = ["anime", "book", "music", "game", "real"] as const;
const typeLabel = {
  anime: "动画",
  book: "书籍",
  music: "音乐",
  game: "游戏",
  real: "三次元"
};

const statusClass = {
  0: "bg-yellow-200 text-yellow-800",
  1: "bg-green-200 text-green-800",
  2: "bg-blue-200 text-blue-800",
  3: "bg-gray-200 text-gray-800",
  4: "bg-red-200 text-red-800"
};

const statusLabel = {
  0: "想看",
  1: "看过",
  2: "在看",
  3: "搁置",
  4: "抛弃"
};

const currentType = ref(collectionTypes[0]);
const currentPage = ref(1);
const pageSize = 20;

let total = 0;
let items: CollectionItem[] = [];

const loadCollections = async () => {
  try {
    const response = await getCollections(
      username,
      currentType.value,
      currentPage.value
    );
    items = response.data;
    total = response.total;
  } catch (error) {
    console.error("加载失败:", error);
  }
};

const totalPages = computed(() => Math.ceil(total / pageSize));

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadCollections();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadCollections();
  }
};

watchEffect(() => {
  currentType.value = collectionTypes[0];
  currentPage.value = 1;
  loadCollections();
});

watch(
  () => route.params.username,
  () => {
    currentPage.value = 1;
    loadCollections();
  }
);
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>