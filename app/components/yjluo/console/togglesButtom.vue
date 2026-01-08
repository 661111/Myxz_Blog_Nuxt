<script setup lang="ts">
import { reactive, onMounted, type Ref } from 'vue';

// ------------------------------
// 1. 类型定义（约束 toggle 数组结构，确保类型安全）
// ------------------------------
interface ToggleItem {
  label: string;          // 按钮显示文本
  click: string;          // 要控制的元素类名（如 z-slide）
  desc: string;           // 功能描述（可选，用于提示）
  VisibilityAction: 'Forward' | 'Reverse' | 'Toggle'; // 操作类型：Forward=显示，Reverse=隐藏
}

// ------------------------------
// 2. 全局控制配置（适配你提供的 toggle 数组）
// ------------------------------
const toggle: ToggleItem[] = [
  { 
    label: '显示精选文章', 
    click: '.z-slide', 
    desc: '控制首页精选(推荐)文章的显示/隐藏', 
    VisibilityAction: 'Toggle'
  },
  { 
    label: '显示评论区', 
    click: '.z-comment', 
    desc: '控制全站评论区的显示/隐藏', 
    VisibilityAction: 'Toggle'
  }
];

// ------------------------------
// 3. 响应式状态：存储「类名→显隐状态」的映射
// ------------------------------
const elementVisibility = reactive<Record<string, boolean>>({});

// ------------------------------
// 4. 初始化：默认所有控制的元素「显示」（true）
// ------------------------------
onMounted(() => {
  toggle.forEach(item => {
    elementVisibility[item.click] = true; // 初始化为显示状态
  });
});

// ------------------------------
// 5. 核心控制函数（无DOM操作，仅修改响应式状态）
// ------------------------------
/** 显示指定类名的所有元素 */
const showElement = (className: string): void => {
  if (elementVisibility.hasOwnProperty(className)) {
    elementVisibility[className] = true;
  } else {
    console.warn(`⚠️ 类名 "${className}" 未配置，无法显示`);
  }
};

/** 隐藏指定类名的所有元素 */
const hideElement = (className: string): void => {
  if (elementVisibility.hasOwnProperty(className)) {
    elementVisibility[className] = false;
  } else {
    console.warn(`⚠️ 类名 "${className}" 未配置，无法隐藏`);
  }
};

/** 切换指定类名元素的显隐状态（正反向切换） */
const toggleElement = (className: string): void => {
  if (elementVisibility.hasOwnProperty(className)) {
    elementVisibility[className] = !elementVisibility[className];
  } else {
    console.warn(`⚠️ 类名 "${className}" 未配置，无法切换`);
  }
};

// ------------------------------
// 6. 处理 toggle 按钮点击（根据 VisibilityAction 执行操作）
// ------------------------------
const handleActionClick = (item: ToggleItem): void => {
  switch (item.VisibilityAction) {
    case 'Forward':
      showElement(item.click); // 执行「显示」操作
      break;
    case 'Reverse':
      hideElement(item.click); // 执行「隐藏」操作
      break;
    // 若需「切换」功能，可新增 case 或直接调用 toggleElement
    case 'Toggle':
      toggleElement(item.click);
      break;
  }
};
</script>
<template>
  <div class="feature-toggles">
    <label class="toggle-switch" v-for="(toggle, index) in toggle" :key="index">
      <input type="checkbox" @click="handleActionClick(toggle)" :class="['control-btn', toggle.VisibilityAction.toLowerCase()]">
      <span class="toggle-slider"></span>
      <div class="toggle-content">
        <span class="toggle-label"> {{ toggle.label }} </span>
        <span class="toggle-description"> {{ toggle.desc }} </span>
      </div>
    </label>
  </div>
</template>
<style lang="css" scoped>
.toggle-switch {
    align-items: center;
    cursor: pointer;
    display: flex;
    gap: .8em;
    margin-bottom: .6em;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none
}
.toggle-switch input {
    display: none
}
.toggle-switch .toggle-slider {
    background-color: var(--c-border);
    border-radius: 999px;
    flex-shrink: 0;
    height: 1.2em;
    position: relative;
    transition: background-color .3s ease;
    width: 2.2em
}
.toggle-switch .toggle-slider:after {
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 4px #0003;
    content: "";
    height: 1em;
    left: .1em;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: left .3s ease;
    width: 1em
}
.toggle-switch .toggle-content {
    display: flex;
    flex-direction: column;
    gap: .2em
}
.toggle-switch .toggle-label {
    color: var(--c-text-1);
    font-size: .9em;
    font-weight: 500;
    transition: color .2s
}
.toggle-switch .toggle-description {
    color: var(--c-text-3);
    font-size: .75em;
    transition: color .2s
}
.toggle-switch input:checked+.toggle-slider {
    background-color: var(--c-primary)
}
.toggle-switch input:checked+.toggle-slider:after {
    left: calc(100% - 1.1em)
}
.toggle-switch input:checked~.toggle-content .toggle-label {
    color: var(--c-text-1)
}
.toggle-switch input:checked~.toggle-content .toggle-description {
    color: var(--c-text-2)
}
.toggle-switch:hover .toggle-label {
    color: var(--c-text-1)
}
.toggle-switch:hover .toggle-description {
    color: var(--c-text-2)
}
</style>
<style lang="scss" scoped>
// 整体CSS
.feature-toggles {
  display: flex;
  flex-direction: column;
  gap: .6em;
  .toggle-switch {
    align-items: center;
    cursor: pointer;
    display: flex;
    gap: .8em;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;

    input {
      display: none;
    }

    .toggle-slider {
      background-color: var(--c-border);
      border-radius: 999px;
      flex-shrink: 0;
      height: 1.2em;
      position: relative;
      transition: background-color .3s ease;
      width: 2.2em;

      :after {
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 2px 4px #0003;
        content: "";
        height: 1em;
        left: .1em;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        transition: left .3s ease;
        width: 1em;
      }
    }
    .toggle-content {
      display: flex;
      flex-direction: column;
      gap: .2em;
      row-gap: 0.2em;
      column-gap: 0.2em;
      .toggle-label {
        color: var(--c-text-1);
        font-size: .9em;
        font-weight: 500;
        transition: color .2s;
      }

      .toggle-description {
        color: var(--c-text-3);
        font-size: .75em;
        transition: color .2s;
      }
    }
  }
}
</style>