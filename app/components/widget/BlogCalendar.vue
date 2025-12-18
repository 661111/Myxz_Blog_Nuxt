<template>
<div class="card-times" id="card-widget-calendar">
      <div id="calendar-area-left">
        <div id="calendar-week"></div>
        <div id="calendar-date"></div>
        <div id="calendar-solar"></div>
        <div id="calendar-lunar"></div>
      </div>
      <div id="calendar-area-right">
        <div id="calendar-main">
          <div class="calendar-rh">
            <div class="calendar-d0"><a>日</a></div>
            <div class="calendar-d1"><a>一</a></div>
            <div class="calendar-d2"><a>二</a></div>
            <div class="calendar-d3"><a>三</a></div>
            <div class="calendar-d4"><a>四</a></div>
            <div class="calendar-d5"><a>五</a></div>
            <div class="calendar-d6"><a>六</a></div>
          </div>
        </div>
      </div>
</div>

<div class="card-times" id="card-widget-calendar">
      <div id="schedule-area-left">
        <div id="schedule-title">距离决赛</div>
        <div id="schedule-days">000</div>
        <div id="schedule-date">2024-12-20</div>
      </div>
      <div id="schedule-area-right">
        <div class="schedule-r0">
          <div class="schedule-d0">本年</div>
          <div class="schedule-d1">
            <span id="p_span_year" class="aside-span1"></span>
            <span class="aside-span2"></span>
            <progress max="365" value="54" id="pBar_year"></progress>
          </div>
        </div>
        <div class="schedule-r1">
          <div class="schedule-d0">本月</div>
          <div class="schedule-d1">
            <span id="p_span_month" class="aside-span1"></span>
            <span class="aside-span2"></span>
            <progress max="30" value="17" id="pBar_month"></progress>
          </div>
        </div>
        <div class="schedule-r2">
          <div class="schedule-d0">本周</div>
          <div class="schedule-d1">
            <span id="p_span_week" class="aside-span1"></span>
            <span class="aside-span2"></span>
            <progress max="7" value="1" id="pBar_week"></progress>
          </div>
        </div>
      </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeMount } from 'vue'
import chineseLunar from 'chinese-lunar' // 假设已安装该库

export default defineComponent({
  name: 'CalendarComponent',
  setup() {
    const now = ref<Date>(new Date())
    const asideTime = ref<Date>(new Date(now.value.getFullYear() + '/01/01 00:00:00'))
    const lunarData = ref({
      animalYear: '',
      ganzhiYear: '',
      lunarMon: '',
      lunarDay: ''
    })
    const anniversary = new Date("2024/12/20 08:30:00")
    const countDown = ref(0)

    // 初始化农历数据
    const updateLunarData = (date: Date) => {
      const lunar = chineseLunar.solarToLunar(date)
      lunarData.value = {
        animalYear: chineseLunar.format(lunar, "A"),
        ganzhiYear: chineseLunar.format(lunar, "T").slice(0, -1),
        lunarMon: chineseLunar.format(lunar, "M"),
        lunarDay: chineseLunar.format(lunar, "d")
      }
    }

    // 更新倒计时
    const updateCountdown = () => {
      countDown.value = Math.floor((anniversary - now.value) / 1000 / 60 / 60 / 24)
    }

    // 更新时间显示
    const updateTimeDisplay = () => {
      const year = now.value.getFullYear()
      const month = now.value.getMonth()
      const date = now.value.getDate()
      const week = now.value.getDay()

      // 更新农历显示
      updateLunarData(now.value)
      
      // 更新DOM元素（使用ref获取）
      const calendarWidget = this.$refs.calendarWidget as HTMLElement
      if (calendarWidget) {
        // 使用Vue模板语法替代原生DOM操作
        calendarWidget.innerHTML = `
          <div>农历：${lunarData.value.ganzhiYear}${lunarData.value.animalYear}年
            ${lunarData.value.lunarMon}${lunarData.value.lunarDay}</div>
          <div>倒计时：${countDown.value}天</div>
        `
      }
    }

    // 生命周期钩子
    onMounted(() => {
      // 初始化调用
      updateTimeDisplay()
      setInterval(() => {
        now.value = new Date()
        updateTimeDisplay()
      }, 1000)
    })

    return {
      // 暴露给模板的数据
    }
  }
})
</script>

<style scoped>
.calendar-progress-widget {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #333;
  max-width: 300px;
  margin: 0 auto;
}

.calendar-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  text-align: center;
  margin-bottom: 20px;
}

.calendar-week {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.calendar-date {
  font-size: 64px;
  font-weight: bold;
  color: #1890ff;
  line-height: 1;
  margin: 10px 0;
  transition: font-size 0.3s ease;
}

.calendar-solar {
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
}

.calendar-lunar {
  font-size: 12px;
  color: #666;
}

.calendar-body {
  margin-top: 20px;
}

.calendar-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.calendar-row {
  display: flex;
  justify-content: space-between;
}

.calendar-day {
  width: 14.28%;
  text-align: center;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-day a {
  display: block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 50%;
  text-decoration: none;
  color: #333;
  font-size: 12px;
  transition: all 0.3s;
}

.calendar-day a.now {
  background: #1890ff;
  color: white;
}

.calendar-day a:hover {
  background: #f0f0f0;
}

.schedule-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.schedule-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.schedule-label {
  width: 60px;
  font-size: 12px;
  color: #666;
  margin-right: 10px;
}

.schedule-progress {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.schedule-progress progress {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
  background: #f0f0f0;
}

.schedule-progress progress::-webkit-progress-bar {
  background: #f0f0f0;
  border-radius: 3px;
}

.schedule-progress progress::-webkit-progress-value {
  background: #1890ff;
  border-radius: 3px;
}

.schedule-progress progress::-moz-progress-bar {
  background: #1890ff;
  border-radius: 3px;
}

.progress-percent {
  font-size: 12px;
  color: #1890ff;
  min-width: 40px;
  text-align: right;
}

.schedule-details {
  width: 80px;
  font-size: 12px;
  color: #999;
  margin-left: 10px;
  text-align: right;
}

.schedule-details span {
  color: #1890ff;
  font-weight: bold;
  margin: 0 3px;
}

.anniversary-countdown {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
  font-size: 12px;
  color: #666;
  text-align: center;
}

.anniversary-countdown span {
  color: #ff4d4f;
  font-weight: bold;
  margin: 0 3px;
}
</style>
