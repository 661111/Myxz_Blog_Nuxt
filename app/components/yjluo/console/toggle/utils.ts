import { ref, DirectiveBinding } from 'vue';

// 存储元素显隐状态的全局 Map
const visibilityState = new Map<string, boolean>();

// 自定义指令实现显隐控制
const vSlideDirective: DirectiveBinding = {
  mounted(el, binding) {
    const className = binding.arg || binding.value;
    if (!className) return;
    
    // 初始化状态（默认显示）
    visibilityState.set(className, true);
    el.classList.add('z-slide');
  },
  updated(el, binding) {
    const className = binding.arg || binding.value;
    if (!className || !visibilityState.has(className)) return;
    
    // 根据状态更新显示
    el.style.display = visibilityState.get(className) ? '' : 'none';
  }
};

// 切换显隐状态
function toggleSlide(className: string) {
  if (!visibilityState.has(className)) {
    visibilityState.set(className, true);
  }
  visibilityState.set(className, !visibilityState.get(className)!);
}

// 隐藏元素
function hideSlide(className: string) {
  visibilityState.set(className, false);
}

// 显示元素
function showSlide(className: string) {
  visibilityState.set(className, true);
}

// 使用示例
// 在组件中：
//   setup() {
//     const toggle = () => toggleSlide('my-elements');
//     return { toggle };
//   }