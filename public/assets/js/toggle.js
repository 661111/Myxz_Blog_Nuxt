// 隐藏元素
function hideElementsByClass() {
  document.querySelectorAll(`.z-slide`).forEach(el => {
    el.style.display = 'none';
  });
}

// 显示元素（恢复默认显示方式）
function showElementsByClass() {
  document.querySelectorAll(`.${className}`).forEach(el => {
    el.style.display = '';
  });
}

// 切换显隐状态
function toggleElementsByClass(className) {
  document.querySelectorAll(`.${className}`).forEach(el => {
    el.style.display = el.style.display === 'none' ? '' : 'none';
  });
}

// 使用示例
hideElementsByClass('target-element'); // 隐藏所有 target-element
showElementsByClass('target-element'); // 显示所有 target-element
toggleElementsByClass('target-element'); // 切换显隐