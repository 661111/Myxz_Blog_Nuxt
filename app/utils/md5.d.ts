// utils/md5.js
import md5 from 'blueimp-md5'; // 依赖 blueimp-md5 包

// 导出常用方法
export const encrypt = (str) => md5(str);
export const hex = (str) => md5(str);

// 或直接导出整个库
export default md5;