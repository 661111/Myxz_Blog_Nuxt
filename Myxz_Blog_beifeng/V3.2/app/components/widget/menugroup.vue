<script setup lang="ts">
const appConfig = useAppConfig()

const MenuGroup = [
    {
        name: '项目', 
        number: '2',
        entries: [
            {
                sitename: '',
                siteurl: '',
                siteimg: '',
            }
        ]
    },
]

const MenuGroup = [
    {siteName: '', },
]

</script>

<template>
    <h3 class="widget-title">
        分站
    </h3>
    <div class="widget-card" id="cardHead">
        <ul>
            <li v-for="(item, groupName) in MenuGroup" :key="groupName">
                <small>{{ item.name }}</small>
                <br>
                <span>{{ item.number }}</span>
            </li>
        </ul>
    </div>
    <!-- TODO: 优化时间线样式 -->
    <div class="back-menu-list"  v-for="(info, groupInfo) in MenuGroup" :key="groupInfo">
        <a class="back-menu-item" target="_blank" rel="noopener external nofollow noreferrer" :href="info.entries.url">
            <img class="back-menu-item-icon" :src="info.entries.siteimg">
            <span> {{ info.entries.sitename }} </span>
        </a>
    </div>
</template>