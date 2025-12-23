<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Solar, Lunar } from 'lunar-typescript';

// 类型定义
interface CalendarDay {
  day: number | string;
  isToday: boolean;
}

// 响应式数据
const now = ref(new Date());
const year = ref<number>(0);
const month = ref<number>(0);
const week = ref<number>(0);
const date = ref<number>(0);
const dates = ref<number>(0);
const weekStr = ref<string>('');
const monthStr = ref<string>('');
const animalYear = ref<string>('');
const ganzhiYear = ref<string>('');
const lunarMon = ref<string>('');
const lunarDay = ref<string>('');
const countdownDays = ref<number>(0);
const progressYear = ref<number>(0);
const progressMonth = ref<number>(0);
const progressWeek = ref<number>(0);
const weekProgressText = ref<string>('');
const yearProgressText = ref<string>('');
const monthProgressText = ref<string>('');
const yearRemainingDays = ref<number>(0); // 新增：年剩余天数

// 计算属性

// 初始化数据
const initData = () => {
  const today = now.value;
  const monthAdd = new Date(1, 12).getMonth
  year.value = today.getFullYear();
  month.value = today.getMonth(); // 0-11
  week.value = today.getDay(); // 0-6 (0=周日)
  date.value = today.getDate();
  
  // 计算当月天数（修复闰年计算）
  const isLeapYear = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  const daysInMonth = [
    31, 
    isLeapYear(year.value) ? 29 : 28, 
    31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ];
  dates.value = daysInMonth[month.value];
  
  // 星期字符串
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  weekStr.value = weekdays[week.value];
  
  // 月份字符串
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  monthStr.value = monthNames[month.value];
  
  // 农历计算
  const solar = Solar.fromDate(today);
  const lunar = solar.getLunar();
  animalYear.value = lunar.getYearShengXiao();
  ganzhiYear.value = lunar.getYearInGanZhi();
  lunarMon.value = lunar.getMonthInChinese();
  lunarDay.value = lunar.getDayInChinese();
  
  // 倒计时计算 (修复日期：2026-02-20)
  const anniversary = new Date(2025, 12, 23).getTime(); // 月份从0开始，1=2月
  countdownDays.value = Math.ceil((anniversary - Date.now()) / (1000 * 60 * 60 * 24));
  
  // 计算进度条
  updateProgressBars();
};

// 更新进度条
const updateProgressBars = () => {
  // 年进度
  const startOfYear = new Date(year.value, 0, 1);
  const endOfYear = new Date(year.value + 1, 0, 1);
  const yearTotalDays = (endOfYear.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
  const daysPassed = (now.value.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
  progressYear.value = Math.min(100, (daysPassed / yearTotalDays) * 100);
  yearProgressText.value = `${(progressYear.value).toFixed(2)}`;
  
  // 修复年剩余天数计算
  yearRemainingDays.value = Math.floor((endOfYear.getTime() - now.value.getTime()) / (1000 * 60 * 60 * 24));
  
  // 月进度
  progressMonth.value = (date.value / dates.value) * 100;
  monthProgressText.value = `${(progressMonth.value).toFixed(2)}`;
  
  // 周进度
  const dayOfWeek = week.value === 0 ? 7 : week.value; // 周日视为第7天
  progressWeek.value = (dayOfWeek / 7) * 100;
  weekProgressText.value = `${(progressWeek.value).toFixed(2)}`;
};

// 生命周期钩子
onMounted(() => {
  initData();
  // 每分钟更新一次
  setInterval(() => {
    now.value = new Date();
    initData();
  }, 60000);
});
</script>

<template>
  <BlogWidget card title="时间卡片">
    <!-- 日程部分 -->
    <div class="card-times" id="card-widget-schedule" style="display: flex;">
      <div id="schedule-area-left">
        <div id="schedule-title">距离决赛</div>
        <div id="schedule-days">{{ countdownDays }}</div>
        <div id="schedule-date">2026-02-20</div>
      </div>
      
      <div id="schedule-area-right">
        <div class="schedule-r0">
          <div class="schedule-d0">本年</div>
          <div class="schedule-d1">
            <span id="p_span_year" class="aside-span1">{{ yearProgressText }}%</span>
            <!-- 修复剩余天数显示 -->
            <span class="aside-span2">还剩<a>{{ yearRemainingDays }}</a>天</span>
            <progress :max="365" :value="Math.floor(365 * progressYear / 100)" id="pBar_year"></progress>
          </div>
        </div>
        
        <div class="schedule-r1">
          <div class="schedule-d0">本月</div>
          <div class="schedule-d1">
            <span id="p_span_month" class="aside-span1">{{ monthProgressText }}%</span>
            <span class="aside-span2">还剩<a>{{ dates - date }}</a>天</span>
            <progress :max="dates" :value="date" id="pBar_month"></progress>
          </div>
        </div>
        
        <div class="schedule-r2">
          <div class="schedule-d0">本周</div>
          <div class="schedule-d1">
            <span id="p_span_week" class="aside-span1">{{ weekProgressText }}%</span>
            <span class="aside-span2">还剩<a>{{ 7 - (week === 0 ? 7 : week) }}</a>天</span>
            <progress max="7" :value="week === 0 ? 7 : week" id="pBar_week"></progress>
          </div>
        </div>
      </div>
    </div>
  </BlogWidget>
</template>

<style lang="css" scoped>

:root {
    --gavin-highlight: rgb(var(--gavin-theme-color));
    --gavin-theme-color-light: 0,100,255;
    --gavin-theme-color-dark: 0,150,255;
}

[data-theme="light"] {
    --op: 255, 255, 255;
    --op-dis: 0, 0, 0;
    --f-0: #fff;
    --dis-f-0: #000;
    --gavin-theme-color: var(--gavin-theme-color-light);
}

[data-theme="dark"] {
    --op: 0, 0, 0;
    --op-dis: 255, 255, 255;
    --f-0: #000;
    --dis-f-0: #fff;
    --gavin-theme-color: var(--gavin-theme-color-dark);
}

.card-widget {
    padding: 10px !important;
    max-height: calc(100vh - 100px);
}

.card-times a,
.card-times div {
    color: var(--dis-f-0);
}

#card-widget-calendar .item-content {
    display: flex;
}

#calendar-area-left {
    width: 45%;
}

#calendar-area-right {
    width: 55%;
}

#calendar-area-left,
#calendar-area-right {
    height: 100%;
    padding: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#calendar-main {
    width: 100%;
}

#calendar-week {
    height: 1.2rem;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: bold;
    align-items: center;
    display: flex;
}

#calendar-date {
    height: 3rem;
    line-height: 1.3;
    font-size: 64px;
    letter-spacing: 3px;
    color: var(--gavin-highlight);
    font-weight: bold;
    align-items: center;
    display: flex;
    position: absolute;
    top: calc(50% - 2.1rem);
}

#calendar-solar,
#calendar-lunar {
    height: 1rem;
    font-size: 12px;
    align-items: center;
    display: flex;
    position: absolute;
}

#calendar-solar {
    bottom: 2.1rem;
}

#calendar-lunar {
    bottom: 1rem;
    color: rgba(var(--op-dis),.4);
}

#calendar-main a {
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    font-size: 12px;
    line-height: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#calendar-main a.now {
    background: var(--gavin-highlight);
    color: var(--f-0);
}

#calendar-main .calendar-rh a {
    color: rgba(var(--op-dis),.4);
}

.calendar-rh,
.calendar-r0,
.calendar-r1,
.calendar-r2,
.calendar-r3,
.calendar-r4,
.calendar-r5 {
    height: 1.2rem;
    display: flex;
}

.calendar-d0,
.calendar-d1,
.calendar-d2,
.calendar-d3,
.calendar-d4,
.calendar-d5,
.calendar-d6 {
    width: calc(100% / 7);
    display: flex;
    justify-content: center;
    align-items: center;
}

#card-widget-schedule .item-content {
    display: flex;
}

#schedule-area-left,
#schedule-area-right {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#schedule-area-left {
    width: 30%;
}

#schedule-area-right {
    width: 70%;
    padding: 0 5px;
}

.schedule-r0,
.schedule-r1,
.schedule-r2 {
    height: 2rem;
    width: 100%;
    align-items: center;
    display: flex;
}

.schedule-d0 {
    width: 30px;
    margin-right: 5px;
    text-align: center;
    font-size: 12px;
}

.schedule-d1 {
    width: calc(100% - 35px);
    height: 1.5rem;
    align-items: center;
    display: flex;
}

progress::-webkit-progress-bar {
    background: linear-gradient(to right, rgba(var(--gavin-theme-color), .03), rgba(var(--gavin-theme-color), .05), rgba(var(--gavin-theme-color), .12));
    border-radius: 5px;
    overflow: hidden;
}

progress::-webkit-progress-value {
    background: rgba(var(--gavin-theme-color), .24);
    border-radius: 5px;
}

.aside-span1,
.aside-span2 {
    height: 1rem;
    font-size: 12px;
    z-index: 1;
    display: flex;
    align-items: center;
    position: absolute;
}

.aside-span1 {
    margin-left: 5px;
}

.aside-span2 {
    right: 20px;
    color: rgba(var(--op-dis),.5);
}

.aside-span2 a {
    margin: 0 3px;
}

#pBar_year,
#pBar_month,
#pBar_week {
    width: 100%;
    border-radius: 5px;
    height: 100%;
}

#schedule-title,
#schedule-days,
#schedule-date {
    display: flex;
    align-items: center;
}

#schedule-title {
    height: 25px;
    line-height: 1;
    font-size: 14px;
    font-weight: bold;
}

#schedule-days {
    height: 40px;
    line-height: 1;
    font-size: 30px;
    font-weight: 900;
    color: var(--gavin-highlight);
}

#schedule-date {
    height: 20px;
    line-height: 1;
    font-size: 12px;
    color: rgba(var(--op-dis),.5);
}
</style>