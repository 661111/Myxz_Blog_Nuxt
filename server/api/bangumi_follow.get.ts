const userId = 3546572553980802

export default defineEventHandler(async (event) => {
  
});

// 类型定义补充
interface CategoryEntry {
  name: string;
  plays: number;
  users: number;
  children?: CategoryEntry[];
}