/**
 * author: 杜朝辉
 * date: 2025-02-17
 * description: 获取VUE组件模块Map
 * 
 */

export function getModules(modules: Record<string, () => Promise<any>>) {
  const modules_map = new Map<string, () => Promise<any>>();
  Object.entries(modules).forEach(([path, component]) => {
    const key = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
    modules_map.set(key, component);
  });
  return modules_map;
}